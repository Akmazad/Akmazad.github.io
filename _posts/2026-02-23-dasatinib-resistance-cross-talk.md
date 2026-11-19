---
title: "How pancreatic cancer cells escape dasatinib: a signalling cross-talk network analysis"
method: "Cross-talk perturbation map"
description: "Coupling each gene's degree of dysregulation with the cross-talk between enriched pathways shows p53 and FcεRI signalling orchestrating 87% of the perturbation map in dasatinib resistance, and nominates BCL2L1 as a target."
theme: cancer
paper: dasatinib-2026
tags: [acquired drug resistance, pancreatic cancer, dasatinib, pathway cross-talk, TCGA, CPTAC, biomarkers]
math: true
---

**Acquired dasatinib resistance (ADR)** undermines treatment of pancreatic cancer (PC). Prolonged exposure to the
drug drives **dynamic reprogramming of signalling**, so the question is not only *which* genes change, but how the
change **spreads** through interconnected pathways. This preprint (bioRxiv, 2026), with Muhammad J. A. Shiddiky and
Mohammad Ali Moni, introduces a cross-talk network model to map that spread.

<!--more-->

## Data

Microarray profiles (Illumina HT-12 v4, GEO **GSE59357**) of three **dasatinib-sensitive** lines (Panc0504, Panc0403,
Panc1005) and three **dasatinib-resistant** lines (MiaPaCa2, Panc1, SU8686), each with three biological replicates.

## The pipeline

1. **Differential expression** (limma with empirical Bayes): genes with $$|\log_2 \mathrm{FC}| \ge 1$$ and
   FDR $$\le 0.05$$ are called DEGs.
2. **Pathway enrichment and perturbation** with **SPIA**, which combines two kinds of evidence: over-representation
   of DEGs (a hypergeometric $$p_{\mathrm{NDE}}$$) and the perturbation that DEGs propagate through the pathway's
   signalling links. The total net accumulated perturbation of a pathway is
   $$t_A = \sum_i \mathrm{Acc}(g_i)$$, and its significance is assessed against bootstrap randomisations of both
   topology and fold-changes, $$p_{\mathrm{PERT}} = \Pr(T_A \ge t_A \mid H_0)$$.
3. **Signalling cross-talk network.** DEGs from the enriched pathways are linked to the pathways they belong to.
   A **cross-talking DEG** is one that connects **at least two pathways**. The network is filtered to strongly
   dysregulated nodes ($$|\log_2 \mathrm{FC}| \ge 2$$) and pruned of degree-1 nodes.
4. **Hub prioritisation.** **Resistance biomarkers** are the hubs with both **high connectivity** (the number of
   pathways cross-talking through the gene) and **high dysregulation** ($$|\log_2 \mathrm{FC}|$$). Correlation and
   Kolmogorov–Smirnov tests then characterise how hubs differ from the remaining genes.

The intuition: a gene that is strongly perturbed **and** bridges many pathways is well placed to
**disseminate** the perturbation, acting as a hub or bottleneck that spreads resistance-associated signalling.

## What we found

<div class="keyfacts">
  <div><b>87%</b><span>of the global perturbation map orchestrated by two pathways</span></div>
  <div><b>10</b><span>key resistance biomarkers</span></div>
  <div><b>3</b><span>independent validation layers (TCGA, CPTAC, STRING)</span></div>
</div>

- **p53 signalling** and **Fc epsilon RI (FcεRI) signalling** showed significant perturbation enrichment and,
  working **complementarily**, accounted for **87% of the global perturbation map** in dasatinib resistance.
- Statistical characterisation of the cross-talk network identified **10 key resistance biomarkers**, including
  **THBS1, CDKN1A and BCL2L1** within p53 signalling and **RAC2 and MAPK13** within FcεRI signalling.
- Validation against **TCGA transcriptomics, CPTAC relative proteomics and STRING protein–protein interactions**
  for prognostic potential singled out **BCL2L1** as pivotal for spreading the global perturbation.

## Why BCL2L1?

BCL2L1 encodes BCL-xL, an anti-apoptotic protein. Its position at the junction of the perturbed pathways makes it
both a **mechanistic explanation** for survival under dasatinib and a **therapeutic hypothesis**: co-targeting
BCL-xL (for example with BH3 mimetics) could re-sensitise resistant tumours. That is a hypothesis for experimental
follow-up.

## Lineage

This study extends the cross-talk modelling we developed for
[lapatinib resistance in breast cancer](/blog/2015/bayesian-signalling-cross-talk-drug-resistance/) to a new drug
and cancer type, and adds proteomic and clinical-cohort validation.
