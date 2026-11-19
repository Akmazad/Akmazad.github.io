---
title: "XTalkiiS: predicting pathway cross-talk within and between species"
method: XTalkiiS
description: "A tool that builds data-driven pathway networks and predicts cross-talk among KEGG pathways within one organism (intra-species) or between two, such as host and parasite (inter-species)."
theme: cancer
paper: xtalkiis-2018
tags: [software, pathway cross-talk, host-pathogen, KEGG, inter-species networks]
math: false
---

Cells communicate through **pathway cross-talk**, and in silico studies of cross-talk within a single species have
helped decode disease phenotypes. Many diseases, though, involve **two organisms**: a host and a pathogen or
parasite, such as *Plasmodium* in malaria. Predicting cross-talk *between* species in a data-driven way had not been
explored. **XTalkiiS** (Cross-talks between inter-/intra-species pathways) set out to do it.

<!--more-->

## The hypothesis

If we measure the expression of pathway components (genes or proteins) **simultaneously in matched samples of
both organisms**, as dual RNA-seq of infected tissue allows, we can build a **data-driven network** that spans
both species. Co-expression edges between a host pathway and a parasite pathway then become candidate
**inter-species cross-talks**.

## How XTalkiiS works

1. **Retrieve pathways.** Using KEGG's RESTful API and an in-house crawler (shared with
   [KPGminer](/blog/2018/kpgminer-kegg-pathway-genes/)), XTalkiiS lists up-to-date pathway information for
   every species in KEGG.
2. **Load a data-driven network** of pathway components, within one organism or across two.
3. **Model cross-talk.** A cross-talk modelling approach in the spirit of our
   [Type-I/Type-II categorisation](/blog/2018/xdamosin-cross-talk-categorisation/) determines which pairs of known
   KEGG pathways interact in the selected organism(s).
4. **Report** intra-species and inter-species cross-talks for downstream interpretation.

## Why it matters

Inter-species cross-talk opens a way to ask **how host and parasite pathways interact** to produce a phenotype
such as malaria pathogenesis, and therefore which host pathways a parasite exploits. This idea fed directly into
later dual RNA-seq work on host–pathogen dynamics (dRNASb, *Microbial Genomics*, 2022) and an MS project at
Monash on mechanisms of drug resistance in malaria.

## Get it

- Source: [github.com/Akmazad/XTalkiiS](https://github.com/Akmazad/XTalkiiS)
- Binaries: [sourceforge.net/projects/xtalkiis](https://sourceforge.net/projects/xtalkiis/)
