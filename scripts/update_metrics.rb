# Refreshes citation metrics from the PI's Google Scholar profile.
#
#   ruby scripts/update_metrics.rb            # update _data/metrics.yml and per-paper citations
#   ruby scripts/update_metrics.rb --dry-run  # print what would change
#
# Runs weekly in GitHub Actions (.github/workflows/update-metrics.yml). Uses only the Ruby standard library.
# If Scholar cannot be read (blocked, CAPTCHA, layout change), nothing is written and the last good
# values stay on the site, so the page never shows partial or mixed-source numbers.
require 'net/http'
require 'uri'
require 'cgi'
require 'date'

ROOT       = File.expand_path('..', __dir__)
METRICS    = File.join(ROOT, '_data', 'metrics.yml')
PUBS       = File.join(ROOT, '_data', 'publications.yml')
SCHOLAR_ID = 'p-Rne_wAAAAJ'
DRY        = ARGV.include?('--dry-run')
UA         = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'

def fetch(url)
  uri = URI(url)
  Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 20, read_timeout: 30) do |h|
    req = Net::HTTP::Get.new(uri, 'User-Agent' => UA, 'Accept-Language' => 'en-US,en;q=0.9')
    res = h.request(req)
    raise "HTTP #{res.code} from #{uri.host}" unless res.is_a?(Net::HTTPSuccess)
    res.body.force_encoding('UTF-8')
  end
end

GREEK = { 'α' => 'alpha', 'β' => 'beta', 'γ' => 'gamma', 'δ' => 'delta', 'ε' => 'epsilon', 'κ' => 'kappa',
           'λ' => 'lambda', 'μ' => 'mu', 'σ' => 'sigma', 'τ' => 'tau', 'ω' => 'omega' }.freeze

def norm(t)
  s = CGI.unescapeHTML(t.to_s).downcase.gsub(/<[^>]+>/, '')
  s = s.gsub(/[αβγδεκλμστω]/) { |c| " #{GREEK[c]} " }
  s.gsub(/[^a-z0-9]+/, ' ').strip
end

# Same paper? Exact normalised title, a shared 60-character prefix, or >= 85% word overlap
# (catches British/American spelling such as "utilising"/"utilizing").
def same?(a, b)
  return true if a == b
  return false if a.length < 30 || b.length < 30
  return true if a.start_with?(b[0, 60]) || b.start_with?(a[0, 60])
  wa = a.split.uniq
  wb = b.split.uniq
  return false if wa.size < 6 || wb.size < 6
  (wa & wb).size.to_f / (wa | wb).size >= 0.85
end

def warn_exit(msg)
  puts "::warning::#{msg}. Keeping the existing metrics."
  exit 0
end

# ---- 1. Scholar profile: headline table + every paper row (100 per page) ----
rows = []
head = nil
begin
  (0..1000).step(100) do |start|
    html = fetch("https://scholar.google.com/citations?user=#{SCHOLAR_ID}&hl=en&cstart=#{start}&pagesize=100")
    warn_exit('Scholar returned a CAPTCHA / unusual-traffic page') if html =~ /gs_captcha|unusual traffic|recaptcha/i
    if start.zero?
      cells = html.scan(%r{<td class="gsc_rsb_std">(\d+)</td>}).flatten.map(&:to_i)
      warn_exit("Scholar metrics table not found (layout changed?)") unless cells.size >= 6
      since = html[/<th class="gsc_rsb_sth">Since (\d{4})<\/th>/, 1]
      head = { citations: cells[0], since_year: since, citations_since: cells[1], h_index: cells[2], i10_index: cells[4] }
    end
    page = html.scan(%r{<tr class="gsc_a_tr">(.*?)</tr>}m).flatten
    page.each do |r|
      title = r[%r{class="gsc_a_at">(.*?)</a>}m, 1]
      cites = r[%r{class="gsc_a_ac gs_ibl"[^>]*>(\d*)<}, 1].to_i
      rows << { title: norm(title), cites: cites } if title
    end
    break if page.size < 100
    sleep 2
  end
rescue StandardError => e
  warn_exit("Could not read Google Scholar (#{e.message})")
end
warn_exit('No papers parsed from Scholar') if rows.empty?

# Sanity check: refuse implausible drops (e.g. a partial page) rather than publish them.
old = File.read(METRICS, encoding: 'utf-8')
old_cites = old[/^citations: (\d+)/, 1].to_i
if head[:citations] < old_cites * 0.9
  warn_exit("Scholar citations fell from #{old_cites} to #{head[:citations]}; looks wrong")
end

# ---- 2. Headline metrics ----
as_of = Date.today.strftime('%B %Y')
new_metrics = old.dup
{ 'as_of' => %("#{as_of}"), 'citations' => head[:citations],
  'h_index' => head[:h_index], 'i10_index' => head[:i10_index] }.each do |k, v|
  new_metrics.sub!(/^#{k}: .*$/) { "#{k}: #{v}" }
end

# ---- 3. Per-paper citations (matched by normalised title; unmatched papers keep their value) ----
by_title = Hash.new(0)
rows.each { |r| by_title[r[:title]] = [by_title[r[:title]], r[:cites]].max }
pubs = File.read(PUBS, encoding: 'utf-8')
blocks = pubs.split(/^(?=- id: )/)
entries = blocks.select { |b| b.start_with?('- id: ') }.map do |b|
  { id: b[/^- id: (\S+)/, 1], title: norm(b[/^  title: "?(.*?)"?\s*$/, 1]), type: b[/^  type: (\S+)/, 1] }
end
# One-to-one matching: exact titles claim their Scholar row first, then fuzzy matches take what is left.
# Datasets are skipped: Scholar lists the paper, and its count must not be copied onto the dataset.
match = {}
claimed = {}
entries.each do |e|
  next if e[:type] == 'dataset' || !by_title.key?(e[:title])
  match[e[:id]] = e[:title]
  claimed[e[:title]] = true
end
entries.each do |e|
  next if e[:type] == 'dataset' || match[e[:id]]
  t = by_title.keys.find { |k| !claimed[k] && same?(k, e[:title]) }
  next unless t
  match[e[:id]] = t
  claimed[t] = true
end
changed = []
unmatched = []
new_pubs = blocks.map do |blk|
  next blk unless blk.start_with?('- id: ')
  id  = blk[/^- id: (\S+)/, 1]
  hit = match[id] && by_title[match[id]]
  if hit.nil?
    unmatched << id
    next blk
  end
  cur = blk[/^  citations: (\d+)/, 1].to_i
  next blk if cur == hit || hit < cur   # never lower a count because of a fuzzy match
  changed << "#{id}: #{cur} -> #{hit}"
  blk.sub(/^  citations: \d+/, "  citations: #{hit}")
end.join

puts "Scholar: #{head[:citations]} citations, h=#{head[:h_index]}, i10=#{head[:i10_index]} (#{rows.size} papers on profile)"
puts "Paper citation updates: #{changed.size}"
changed.each { |c| puts "  #{c}" }
puts "Not matched on Scholar (unchanged): #{unmatched.size} #{unmatched.join(", ")}"

site_titles = pubs.scan(/^  title: "?(.*?)"?\s*$/).flatten.map { |t| norm(t) }
missing = rows.reject { |r| site_titles.any? { |t| same?(t, r[:title]) } }
puts "On Scholar but not on the site: #{missing.size}"
missing.each { |r| puts "  NEW: #{r[:title]} (#{r[:cites]} citations)" }

if DRY
  puts '(dry run: nothing written)'
else
  File.write(METRICS, new_metrics) if new_metrics != old
  File.write(PUBS, new_pubs) if new_pubs != pubs
end
