---
title: "BNMCMC: inferring and visualising Bayesian networks with modern MCMC samplers"
method: BNMCMC
description: "Software that runs the Neighbourhood, Hit-and-Run and Metropolis–Hastings samplers for discrete Bayesian network structure learning, with adaptive exploration and interactive network visualisation."
theme: bayes
paper: bnmcmc-2018
tags: [software, Bayesian networks, MCMC, Hit-and-Run, Neighbourhood sampler, visualisation]
math: false
---

Bayesian networks (BNs) are widely used to model biological networks from experimental data, and many packages
can infer BN structure. In practice, though, the inference often gets **trapped in local optima**. Our
[methods work](/blog/2016/neighbourhood-sampler-bayesian-networks/) showed that the **Neighbourhood sampler (NS)**
and the **Hit-and-Run (HAR)** sampler avoid this far better than the standard **Metropolis–Hastings (MH)** sampler.
BNMCMC puts those samplers in practitioners' hands.

<!--more-->

## What BNMCMC does

- **Three samplers in one place:** NS, HAR and MH, all targeting the posterior over BN structures under a
  **discrete Bayesian model** for categorical data.
- **Adaptive exploration:** the samplers exploit adaptive techniques to explore BN space efficiently and to
  evaluate the posterior probability of candidate networks, which matters for **large-scale** network inference.
- **Visualisation:** a web front-end draws the inferred networks. The planned server version uses a
  physics-based (force-directed) BN layout in D3.js.

## A typical MCMC structure-learning workflow

1. Prepare a discretised data matrix (samples × variables).
2. Choose a sampler (NS or HAR for rugged posteriors; MH as a baseline) and the chain length.
3. Run the chain, discarding burn-in.
4. Summarise the sampled networks, for example as **posterior edge probabilities** or the highest-posterior network.
5. Visualise the result.

## Under the hood

BNMCMC is implemented in **C#.NET and ASP.NET** with **jQuery, JavaScript and D3.js** for the interface. The
standalone version, without the visualisation, comes with a user guide and an example simulation file.

## Get it

- Standalone download: [sourceforge.net/projects/bnmcmc](https://sourceforge.net/projects/bnmcmc/)
- Source code (server version): [github.com/Akmazad/BNMCMC-Server](https://github.com/Akmazad/BNMCMC-Server)

The same samplers were used to learn causal models of perturbed TGF-β signalling in
[PathTurbEr](/blog/2021/pathturber-perturbation-drivers/).
