# ADNS Lab website

Source of <https://akmazad.github.io>, the website of the **Advanced Data & Network Science (ADNS) Lab**
at Imam Mohammad Ibn Saud Islamic University (IMSIU), led by Dr AKM Azad.

The site is plain Jekyll with only GitHub-Pages-whitelisted plugins, so **pushing to `master` publishes it**;
no build step or GitHub Action is needed.

## Where things live

| To change… | Edit |
|---|---|
| Publications (113 entries, PDFs, code/blog links) | `_data/publications.yml` |
| Citation numbers on home/publications | `_data/metrics.yml` |
| Research themes | `_data/research.yml` |
| News items (newest first) | `_data/news.yml` |
| People, trainees, collaborators | `_data/people.yml` (photos in `images/people/`) |
| Software & resources | `_data/software.yml` |
| Grants | `_data/grants.yml` |
| Teaching | `_data/teaching.yml` |
| PI CV page | `_data/cv.yml` |
| Top menu | `_data/navigation.yml` |
| Methods blog posts | `_posts/YYYY-MM-DD-slug.md` |
| Site title, email, profiles | `_config.yml` |

### Adding a publication
Copy an entry in `_data/publications.yml`. Required: `id`, `title`, `authors`, `venue`, `year`, `date`, `type`,
`role`, `topics`, `bibkey`, `citations`. Optional: `doi`, `pdf` (put the file in `files/papers/`), `preprint`,
`code`, `web`, `data`, `blog`, `quartile`, `featured: true`, `gbd: true`, `open_access: true`.
Write your name exactly as `AKM Azad` so it is highlighted. The BibTeX file `/files/adns-publications.bib` is
generated from this list automatically.

Only host PDFs that are open access under a Creative Commons licence, or your own preprints.

### Adding a blog post
Create `_posts/2026-12-01-my-method.md`:

```yaml
---
title: "My method: one-line summary"
method: MyMethod          # short name shown on the card
description: "Two-sentence summary."
theme: bayes              # an id from _data/research.yml
paper: my-paper-id        # one or more publication ids, comma-separated
tags: [tag1, tag2]
math: true                # enables MathJax; write math as $$ ... $$
---
```
Then set `blog: "/blog/2026/my-method/"` on the paper in `_data/publications.yml`.

## Local preview
```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```
