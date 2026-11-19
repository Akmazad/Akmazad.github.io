---
title: "Predicting the signalling cross-talks behind lapatinib resistance with a Bayesian p₁-model"
method: "p₁-model cross-talk"
description: "A fully Bayesian network model compares resistant and parental breast cancer cells to find gene pairs that newly interact across pathways, linking EGFR/ErbB to Notch, Wnt, GPCR, Hedgehog, IGF1R and TGF-β signalling."
theme: bayes
paper: xtalk-bmc-2015
tags: [Bayesian modelling, ERGM, p1-model, acquired drug resistance, breast cancer, lapatinib, pathway cross-talk]
math: true
---

Targeted cancer drugs often work brilliantly at first, then stop working. In HER2/ErbB2-positive breast cancer,
the EGFR/HER2 inhibitor **lapatinib** shrinks tumours, but cells acquire resistance. Mutations in the drug
target explain only part of this. The rest comes from **signalling cross-talk**: other pathways
rewire to compensate for the inhibited one. This paper, featured as an Editors' pick in *BMC Systems Biology*, asked
which cross-talks appear when cells become resistant.

<!--more-->

## The modelling idea

We treat each condition, **parental (sensitive) SKBR3** cells and **lapatinib-resistant SKBR3-R** cells, as
an undirected gene network inferred from expression data, and ask for every gene pair
$$(i,j)$$: *what is the posterior probability that they interact in this condition?*

To answer that in a fully Bayesian way we used the **p₁-model**, an exponential random graph model (ERGM)
originally proposed by Holland and Leinhardt. In its undirected form, the probability of an edge between
nodes $$i$$ and $$j$$ depends on a global density parameter and node-specific "expansiveness" terms:

$$
\Pr(x_{ij}=1 \mid \theta, \alpha) \;=\; \frac{\exp(\theta + \alpha_i + \alpha_j)}{1 + \exp(\theta + \alpha_i + \alpha_j)},
$$

so hub-like genes (large $$\alpha_i$$) are allowed to be densely connected without inflating the evidence for any
single edge. Placing priors on $$\theta$$ and the $$\alpha$$s and sampling the joint posterior with MCMC yields,
for every pair, a **posterior probability of interaction** in each condition, rather than a single
point estimate.

## Defining a drug-resistant cross-talk

A gene pair is a candidate **resistance cross-talk** if:

1. one gene belongs to the **EGFR/ErbB signalling pathway** (the drug's target) and the other to a *different*
   signalling pathway (from Reactome, KEGG or WikiPathways); and
2. the pair is inferred to **interact in resistant cells but not in parental cells**.

## What we found

<div class="keyfacts">
  <div><b>104 / 188 / 299</b><span>candidate cross-talks (Reactome / KEGG / WikiPathways)</span></div>
  <div><b>168</b><span>distinct pairs with both genes up-regulated in resistance</span></div>
  <div><b>6</b><span>partner pathways recurring with EGFR/ErbB</span></div>
</div>

The 168 pairs in which **both partners were up-regulated** in resistant cells are the prime candidates. They
connect EGFR/ErbB signalling with six pathways: **Notch, Wnt, GPCR, Hedgehog, insulin receptor/IGF1R and
TGF-β receptor signalling**. A literature survey supported a role in drug resistance for many of them.

Crucially, the same partner pathways reappeared when we analysed an **independent lapatinib-resistance study
in BT474 cells**. That replication made us more confident that the signal is biological rather than an
artefact of one dataset.

## The interpretation

Compensatory pathways can **up-regulate EGFR/ErbB pathway genes through cross-talk**, counteracting the
inhibitor. The up-regulated members of those compensatory pathways are therefore candidate **co-targets**:
inhibiting them alongside lapatinib might delay or prevent resistance.

This paper was the first in a line of work. [Signal rewiring and V-structures](/blog/2017/signal-rewiring-v-structures/)
extended the model, the [cross-talk categorisation](/blog/2018/xdamosin-cross-talk-categorisation/) formalised what
counts as a cross-talk, and [PathTurbEr](/blog/2021/pathturber-perturbation-drivers/) moved to causal Bayesian networks.
