/* Publication explorer: search, facet filters, year histogram, sort, URL state. */
(function () {
  "use strict";
  var root = document.getElementById("pub-explorer");
  if (!root) return;
  var items = Array.prototype.slice.call(root.querySelectorAll(".pub"));
  var groups = Array.prototype.slice.call(root.querySelectorAll(".year-group"));
  var flat = document.getElementById("pub-flat");
  var q = document.getElementById("pub-q");
  var countEl = document.getElementById("pub-count");
  var sortSel = document.getElementById("pub-sort");
  var gbdBox = document.getElementById("pub-gbd");
  var empty = document.getElementById("pub-empty");
  var chart = document.getElementById("year-chart");
  items.forEach(function (li, i) { li._home = li.parentNode; li._idx = i; });

  var state = { q: "", topic: "all", type: "all", role: "all", year: "all", gbd: "include", sort: "year" };

  // URL -> state
  var params = new URLSearchParams(window.location.search);
  ["q", "topic", "type", "role", "year", "gbd", "sort"].forEach(function (k) { if (params.get(k)) state[k] = params.get(k); });
  if (state.q && q) q.value = state.q;

  function matches(li) {
    var d = li.dataset;
    if (state.gbd === "exclude" && d.gbd === "1") return false;
    if (state.gbd === "only" && d.gbd !== "1") return false;
    if (state.topic !== "all" && (" " + d.topics + " ").indexOf(" " + state.topic + " ") < 0) return false;
    if (state.type !== "all") {
      if (state.type === "other") { if (["journal", "preprint", "conference"].indexOf(d.type) > -1) return false; }
      else if (d.type !== state.type) return false;
    }
    if (state.role === "lead" && ["first", "senior", "sole"].indexOf(d.role) < 0) return false;
    if (state.role === "featured" && d.featured !== "1") return false;
    if (state.year !== "all" && d.year !== state.year) return false;
    if (state.q) {
      var terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      for (var i = 0; i < terms.length; i++) if (d.search.indexOf(terms[i]) < 0) return false;
    }
    return true;
  }

  function syncChips() {
    root.querySelectorAll("[data-facet]").forEach(function (grp) {
      var f = grp.getAttribute("data-facet");
      grp.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-value") === state[f] ? "true" : "false"); });
    });
    if (gbdBox) gbdBox.value = state.gbd;
    if (sortSel) sortSel.value = state.sort;
  }

  function writeURL() {
    var p = new URLSearchParams();
    Object.keys(state).forEach(function (k) {
      var def = { q: "", topic: "all", type: "all", role: "all", year: "all", gbd: "include", sort: "year" }[k];
      if (state[k] && state[k] !== def) p.set(k, state[k]);
    });
    var s = p.toString();
    history.replaceState(null, "", window.location.pathname + (s ? "?" + s : "") + window.location.hash);
  }

  function drawChart(visibleByYear) {
    if (!chart) return;
    var years = {};
    items.forEach(function (li) {
      // histogram ignores the year facet itself so it stays navigable
      var saved = state.year; state.year = "all"; var ok = matches(li); state.year = saved;
      if (ok) years[li.dataset.year] = (years[li.dataset.year] || 0) + 1;
    });
    var ys = Object.keys(years).map(Number);
    var all = items.map(function (li) { return +li.dataset.year; });
    var minY = Math.min.apply(null, all), maxY = Math.max.apply(null, all);
    var max = Math.max.apply(null, ys.map(function (y) { return years[y]; }).concat([1]));
    var html = "";
    for (var y = minY; y <= maxY; y++) {
      var n = years[y] || 0, h = n ? Math.max(4, Math.round(n / max * 100)) : 0;
      html += '<button type="button" class="bar-wrap' + (state.year === String(y) ? " on" : "") + '" data-year="' + y + '" aria-label="' + n + ' publications in ' + y + '" title="' + y + ": " + n + '">' +
        '<span class="bar-n">' + (n || "") + '</span><span class="bar" style="height:' + h + '%"></span><span class="bar-y">' + String(y).slice(2) + "</span></button>";
    }
    chart.innerHTML = html;
  }

  function apply() {
    var shown = 0;
    var vis = [];
    items.forEach(function (li) { var ok = matches(li); li.classList.toggle("is-hidden", !ok); if (ok) { shown++; vis.push(li); } });
    if (state.sort === "cites") {
      vis.sort(function (a, b) { return (+b.dataset.cites) - (+a.dataset.cites) || a._idx - b._idx; });
      items.forEach(function (li) { if (li.classList.contains("is-hidden")) li._home.appendChild(li); });
      vis.forEach(function (li) { flat.appendChild(li); });
      flat.parentNode.classList.remove("is-hidden");
      groups.forEach(function (g) { g.classList.add("is-hidden"); });
    } else {
      items.forEach(function (li) { if (li.parentNode !== li._home) li._home.appendChild(li); });
      // restore original order inside each group
      groups.forEach(function (g) {
        var ol = g.querySelector("ol");
        Array.prototype.slice.call(ol.children).sort(function (a, b) { return a._idx - b._idx; }).forEach(function (li) { ol.appendChild(li); });
        var n = ol.querySelectorAll(".pub:not(.is-hidden)").length;
        g.classList.toggle("is-hidden", n === 0);
        var c = g.querySelector(".year-n"); if (c) c.textContent = n + (n === 1 ? " paper" : " papers");
      });
      flat.parentNode.classList.add("is-hidden");
    }
    if (countEl) countEl.textContent = shown + " of " + items.length;
    if (empty) empty.classList.toggle("show", shown === 0);
    drawChart();
    syncChips();
    writeURL();
  }

  root.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (chip && chip.closest("[data-facet]")) {
      var f = chip.closest("[data-facet]").getAttribute("data-facet");
      state[f] = chip.getAttribute("data-value");
      apply(); return;
    }
    var bar = e.target.closest(".bar-wrap");
    if (bar) { var y = bar.getAttribute("data-year"); state.year = state.year === y ? "all" : y; apply(); return; }
    var reset = e.target.closest("#pub-reset");
    if (reset) { state = { q: "", topic: "all", type: "all", role: "all", year: "all", gbd: "include", sort: "year" }; if (q) q.value = ""; apply(); }
  });
  var t;
  if (q) q.addEventListener("input", function () { clearTimeout(t); t = setTimeout(function () { state.q = q.value.trim(); apply(); }, 120); });
  if (sortSel) sortSel.addEventListener("change", function () { state.sort = sortSel.value; apply(); });
  if (gbdBox) gbdBox.addEventListener("change", function () { state.gbd = gbdBox.value; apply(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== q && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); q && q.focus(); }
  });
  apply();
})();
