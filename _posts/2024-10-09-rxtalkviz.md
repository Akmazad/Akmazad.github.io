---
title: "rXTalkViz: quantifying and visualising functional cross-talk in R"
method: rXTalkViz
description: "An R package that goes beyond one-at-a-time enrichment tests by quantifying cross-talk between enriched pathways or functional terms and producing publication-ready network figures."
theme: cancer
paper: rxtalkviz-2024
tags: [R package, pathway cross-talk, enrichment analysis, network visualisation, cancer biology]
math: false
---

The standard post-omics workflow, **differential expression followed by enrichment testing**, tells you which
pathways or GO terms are over-represented, but treats each term **in isolation**. Tumour biology is not like that:
enriched pathways interact, and **cross-talk among them** helps explain the tumour microenvironment, metastasis and
drug resistance. No tool streamlined comprehensive functional cross-talk analysis. **rXTalkViz**, published in
*Software Impacts*, is an R package that does.

<!--more-->

## What rXTalkViz does

- **Quantifies** cross-talk between enriched pathways or functional terms, using network-medicine ideas
  (shared and interacting genes between terms; see our
  [Type-I/Type-II categorisation](/blog/2018/xdamosin-cross-talk-categorisation/)).
- **Visualises** the resulting cross-talk network with a grammar-of-graphics approach (ggplot2-style), producing
  **publication-ready** figures.
- **Reports** the cross-talks in tidy tables for downstream analysis.

## Where it fits in a pipeline

```r
# Typical placement in an omics workflow
# 1. Differential expression  ->  list of biomarkers / DEGs
# 2. Enrichment analysis      ->  enriched pathways or GO terms
# 3. rXTalkViz                ->  quantified functional cross-talk + network figure
# 4. Prioritise hub terms and bridging genes for follow-up
```

Because it works downstream of standard enrichment analysis, rXTalkViz slots into existing **R**
pipelines without reshaping the analysis.

## Why it matters

Pathway cross-talk is central to **cancer progression and drug resistance**, as our own work on
[lapatinib](/blog/2015/bayesian-signalling-cross-talk-drug-resistance/) and
[dasatinib resistance](/blog/2026/dasatinib-resistance-cross-talk/) shows. Making cross-talk analysis
routine, quantitative and visual helps researchers move from "these pathways are enriched" to "these pathways
**talk to each other**, through these genes".

## Get it

Source and installation instructions: [github.com/Akmazad/rXTalkViz](https://github.com/Akmazad/rXTalkViz).
