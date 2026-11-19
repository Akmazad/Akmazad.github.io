---
title: "PathTurbEr: finding the driver genes of perturbed signalling pathways with causal Bayesian networks"
method: PathTurbEr
description: "Causal Bayesian networks learned with Neighbourhood, Hit-and-Run and Metropolis–Hastings samplers, then analysed with the p₁-model, pinpoint perturbation drivers of TGF-β signalling in lapatinib-resistant breast cancer."
theme: bayes
paper: lapatinib-2021
tags: [Bayesian networks, MCMC, ERGM, p1-model, biomarker discovery, TGF-beta, lapatinib resistance]
math: true
---

Cancers hijack **signal transduction pathways (STPs)** to grow and resist therapy, but finding *which genes drive*
the aberration is hard. Differential expression tells us what changed, not what is **causing** the change.
**PathTurbEr** (Pathway Perturbation Driver), published in *Briefings in Bioinformatics* with Salem Alyami, combines
causal network learning and random-graph modelling to find drivers inside a perturbed pathway.

<!--more-->

## Pipeline at a glance

<div class="diagram" role="img" aria-label="PathTurbEr pipeline from expression data to perturbation drivers">
<svg viewBox="0 0 720 120">
  <rect class="d-box" x="5" y="35" width="130" height="50" rx="10"/><text x="70" y="58" text-anchor="middle" font-size="12">Expression data</text><text x="70" y="74" text-anchor="middle" class="d-small">sensitive vs resistant</text>
  <rect class="d-box" x="150" y="35" width="130" height="50" rx="10"/><text x="215" y="58" text-anchor="middle" font-size="12">DEGs + enrichment</text><text x="215" y="74" text-anchor="middle" class="d-small">perturbed STPs</text>
  <rect class="d-acc" x="295" y="35" width="135" height="50" rx="10"/><text x="362" y="58" text-anchor="middle" font-size="12">Causal BN of STP</text><text x="362" y="74" text-anchor="middle" class="d-small">NS · HAR · MH</text>
  <rect class="d-acc2" x="445" y="35" width="130" height="50" rx="10"/><text x="510" y="58" text-anchor="middle" font-size="12">p₁-model (ERGM)</text><text x="510" y="74" text-anchor="middle" class="d-small">structural features</text>
  <rect class="d-acc" x="590" y="35" width="125" height="50" rx="10"/><text x="652" y="64" text-anchor="middle" font-size="12">Driver genes</text>
  <path class="d-line" d="M135 60 H150 M280 60 H295 M430 60 H445 M575 60 H590" stroke-width="1.5"/>
</svg>
</div>

## Step 1: find the perturbed pathways

Using expression data from **lapatinib-sensitive and lapatinib-resistant SKBR3** breast cancer cells (lapatinib is a
dual EGFR/HER2 inhibitor), differential expression analysis found **512 differentially expressed genes**. Pathway
enrichment revealed **13 highly perturbed signalling pathways** in resistance, including **PI3K–AKT, chemokine,
Hippo and TGF-β** signalling.

## Step 2: learn the causal structure of the perturbed pathway

The aberrant **TGF-β pathway** was modelled as a **causal Bayesian network**, with posterior

$$
\Pr(G \mid D) \;\propto\; \Pr(D \mid G)\,\Pr(G),
$$

sampled with three MCMC samplers: the **Neighbourhood sampler (NS)** and **Hit-and-Run (HAR)** sampler, which
yield robust inference with less risk of local optima and faster convergence, and **Metropolis–Hastings (MH)** as a
baseline. (See our posts on the [Neighbourhood sampler](/blog/2016/neighbourhood-sampler-bayesian-networks/) and
[BNMCMC](/blog/2018/bnmcmc-software/).)

## Step 3: ask which nodes shape the network

An optimal network is still just a graph; drivers are the nodes that **shape its global structure**. We treated
the learned BN as the output of a statistical generative process, the **p₁-model**, a special class of exponential
random graph model (ERGM) with node-level expansiveness and attractiveness parameters, and sampled its
hyper-parameters by MCMC. Genes whose parameters stand out are the ones that drive the aberration within the
perturbed pathway.

## Results

<div class="keyfacts">
  <div><b>80</b><span>genes in the TGF-β pathway model</span></div>
  <div><b>34 / 34 / 23</b><span>driver genes (NS / HAR / MH networks)</span></div>
  <div><b>13</b><span>perturbed signalling pathways</span></div>
</div>

Functional-relevance and disease-relevance analyses showed that the drivers are significantly associated with
**breast cancer progression and resistance**. That makes them candidate biomarkers and co-targets to pair with
EGFR/HER2 inhibition.

## Code

PathTurbEr is open source: [github.com/Akmazad/PathTurbEr](https://github.com/Akmazad/PathTurbEr).
