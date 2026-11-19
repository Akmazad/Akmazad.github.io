---
title: "KPGminer: retrieving up-to-date pathway genes from KEGG, for any organism"
method: KPGminer
description: "A tool that queries the KEGG REST API to collect and organise the constituent genes of one pathway or many, ready for enrichment, network and cross-talk pipelines."
theme: omics
paper: kpgminer-2018
tags: [software, KEGG, pathway analysis, REST API, bioinformatics pipelines]
math: false
---

Almost every systems-biology pipeline eventually needs the same thing: **the list of genes in each pathway**.
KEGG is among the most widely used pathway resources, but turning its pathway maps into clean, organism-specific
gene sets by hand is slow and error-prone, and the lists go stale as KEGG is updated. **KPGminer** (KEGG Pathway
Gene miner) automates the job.

<!--more-->

## How it works

1. **Query KEGG web services.** KPGminer uses KEGG's REST API, in particular the `LIST` and `GET` operations, to
   enumerate organisms and pathways and to request pathway records.
2. **Crawl and parse.** A purpose-built crawler extracts the gene entries from each response.
3. **Organise the output.** Genes are written per pathway in a format that drops straight into downstream
   tools: enrichment tests, network construction, or cross-talk detection.

## Two modes

- **Single mode:** pull the genes of one pathway, for example `hsa04012`, the human ErbB signalling pathway.
- **Batch mode:** pull every pathway, or a chosen subset, for an organism in one run.

## Why use it

- **Organism-specific and pathway-specific** extraction, for any species in KEGG.
- **Always current:** every run fetches live data, so gene sets track KEGG releases.
- **Reproducible:** scripted retrieval replaces copy-and-paste from pathway maps.

KPGminer's retrieval layer was reused in [XTalkiiS](/blog/2018/xtalkiis-inter-species-cross-talk/) and in
the pathway-level analyses behind our cross-talk work.

## Get it

- Download: [sourceforge.net/projects/kpgminer](https://sourceforge.net/projects/kpgminer/)
- Source: [github.com/Akmazad/KPGminer](https://github.com/Akmazad/KPGminer)
