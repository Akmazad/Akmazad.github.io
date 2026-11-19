---
title: "Signal rewiring and V-structures: a Bayesian view of how breast cancer cells bypass lapatinib"
method: "Signal rewiring"
description: "Differential posterior edge probabilities between resistant and parental networks expose dysregulated pathways, and a new motif, the V-structure, captures the switch from targeted to bypass signalling."
theme: cancer
paper: "signal-rewiring-2017, phd-thesis-2017"
tags: [signal rewiring, acquired resistance, p1-model, V-structures, EGFR-TKI, breast cancer]
math: true
---

Small-molecule inhibitors such as **lapatinib** are effective in ErbB2-positive breast cancer, yet tumour cells
eventually adapt. A growing body of evidence pointed to **adaptive reprogramming of signalling circuitry**, or
*signal rewiring*, as a major cause. In this *PLOS ONE* paper we built a Bayesian framework to model that
rewiring directly, and found a recurring network pattern that captures how cells switch to bypass routes.

<!--more-->

## From "which genes change?" to "which links change?"

Classical pathway analyses are **node-centric**: they ask whether the genes of a pathway are differentially
expressed (SPIA, DAVID, GATHER). Signal rewiring is about **edges**: two genes may each change little while their
*dependency* switches on or off. We therefore used the **p₁-model** (an exponential random graph model; see our
[2015 cross-talk paper](/blog/2015/bayesian-signalling-cross-talk-drug-resistance/)) to infer, for every gene pair,
a posterior probability of interaction in the **resistant** network and in the **parental** network.

A pair is **aberrant** when those probabilities differ substantially:

$$
\Delta_{ij} \;=\; \Pr(x_{ij}=1 \mid D_{\text{resistant}}) \;-\; \Pr(x_{ij}=1 \mid D_{\text{parental}}).
$$

Pathways that accumulate many aberrant pairs are flagged as **dysregulated**, an edge-centric view that is
complementary to node-centric tools.

## Two cell lines, one story

Using matched expression profiles from two lapatinib-treated ErbB2-positive lines, **SKBR3** and **BT474**, the
method identified similar sets of dysregulated pathways: **EGFR-related pathways** and **other receptor-related
pathways**, many previously reported as compensatory routes after EGFR inhibition. A manual literature survey
provided strong support for their role in acquired resistance to EGFR tyrosine-kinase inhibitors.

The predictions were **complementary** to both node-centric methods (SPIA, DAVID, GATHER) and edge-centric
methods (ESEA, PAGI), picking up literature-supported pathways that the others missed.

## A new motif: V-structures of aberrant signalling

The key conceptual contribution is the **V-structure**. Consider three genes where a gene $$j$$ is linked to $$i$$
in one condition but to $$k$$ in the other:

<div class="diagram" role="img" aria-label="V-structure: gene j switches its dependency from gene i in sensitive cells to gene k in resistant cells">
<svg viewBox="0 0 720 170">
  <text x="170" y="22" text-anchor="middle" font-size="13" font-weight="600">Sensitive (parental)</text>
  <text x="550" y="22" text-anchor="middle" font-size="13" font-weight="600">Resistant</text>
  <path class="d-line" d="M170 60 L90 140" stroke-width="2.5"/>
  <path class="d-line" d="M170 60 L250 140" stroke-width="1.2" stroke-dasharray="5 5"/>
  <path class="d-line" d="M550 60 L470 140" stroke-width="1.2" stroke-dasharray="5 5"/>
  <path class="d-line" d="M550 60 L630 140" stroke-width="2.5"/>
  <circle class="d-acc" cx="170" cy="60" r="20"/><text x="170" y="65" text-anchor="middle" font-size="13">j</text>
  <circle class="d-box" cx="90" cy="140" r="20"/><text x="90" y="145" text-anchor="middle" font-size="13">i</text>
  <circle class="d-box" cx="250" cy="140" r="20"/><text x="250" y="145" text-anchor="middle" font-size="13">k</text>
  <circle class="d-acc" cx="550" cy="60" r="20"/><text x="550" y="65" text-anchor="middle" font-size="13">j</text>
  <circle class="d-box" cx="470" cy="140" r="20"/><text x="470" y="145" text-anchor="middle" font-size="13">i</text>
  <circle class="d-acc2" cx="630" cy="140" r="20"/><text x="630" y="145" text-anchor="middle" font-size="13">k</text>
  <text x="360" y="100" text-anchor="middle" font-size="22">→</text>
  <text x="90" y="168" text-anchor="middle" class="d-small">targeted</text><text x="630" y="168" text-anchor="middle" class="d-small">bypass</text>
</svg>
</div>

We observed that genes were **dysregulated** between resistant and sensitive conditions precisely when they
took part in such a **switch of dependencies from targeted to bypass signalling events**. Literature evidence
for several important V-structures suggested roles in breast cancer metastasis and in acquired resistance to
EGFR-TKIs. In particular, mRNA changes of **TGFBR2, LEF1 and TP53** were tied to dependency switches from
targeted to bypass links.

## Take-home message

Many signalling pathway structures are compromised in acquired resistance, and **V-structures** within and among
those pathways offer a mechanistic handle on *how* bypass happens, not just *which* genes change. This work
formed the core of my PhD thesis at Monash University, *Computational modelling and characterisation of cell
signalling cross-talks in acquired drug resistance* (2017).
