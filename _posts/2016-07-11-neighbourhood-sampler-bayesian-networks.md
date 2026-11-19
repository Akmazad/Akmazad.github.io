---
title: "The Neighbourhood sampler: escaping local optima when learning Bayesian networks"
method: Neighbourhood sampler
description: "An MCMC sampler that proposes moves within a structured neighbourhood of the current graph, avoiding the local modes that trap Metropolis–Hastings when learning Bayesian network structure."
theme: bayes
paper: "nbhd-mcmc-2016, uniform-graph-sampling-2016"
tags: [MCMC, Bayesian networks, structure learning, graph sampling, Neighbourhood sampler]
math: true
---

Bayesian networks (BNs) are directed acyclic graphs (DAGs) whose edges encode conditional dependencies. They are
a natural language for gene regulation and signalling. Learning the **structure** of a BN from data is hard,
though: the number of DAGs grows super-exponentially with the number of nodes, and the posterior over graphs is
**highly multimodal**. Standard samplers get stuck. With Salem Alyami and Jonathan Keith at Monash, we studied a
sampler designed to get unstuck.

<!--more-->

## The set-up

Let $$N$$ be the set of nodes, $$E$$ the set of directed edges and $$D$$ the data. Bayesian structure learning
targets the posterior

$$
f(N, E \mid D) \;\propto\; \Pr(D \mid N, E)\, \Pr(N, E),
$$

and the goal is to draw samples of graphs $$(N,E)$$ from it, so that edge probabilities, model
averaging and uncertainty all come for free.

## Why Metropolis–Hastings struggles

The classical **Metropolis–Hastings (MH)** structure sampler proposes a small local change, such as adding,
deleting or reversing a single edge, and accepts it with probability

$$
\min\!\left(1,\; \frac{f(G' \mid D)\, q(G \mid G')}{f(G \mid D)\, q(G' \mid G)}\right).
$$

When the current graph sits on a local peak of the posterior, every single-edge neighbour looks worse, so almost
every proposal is rejected and the chain stays put. Mixing is slow and inferences depend on where the chain started.

## The Neighbourhood sampler

The **Neighbourhood sampler (NS)**, introduced by Keith and colleagues as a generalisation of the Gibbs sampler,
changes how moves are generated. Instead of proposing a single random neighbour and accepting or
rejecting it, each step:

1. selects a **neighbourhood** $$\mathcal{N}$$, a set of graphs that contains the current graph $$G$$; and
2. draws the next graph from within $$\mathcal{N}$$ **with probability proportional to its posterior**,
   $$\Pr(G' \mid \mathcal{N}) \propto f(G' \mid D)$$ for $$G' \in \mathcal{N}$$.

The chain therefore always moves to a good member of the neighbourhood rather than repeatedly
rejecting proposals, while still leaving the target posterior invariant. Because the sampler "sees" a whole
region of the landscape at each step, it can **walk off a local mode** that would trap MH.

We showed in simulations that NS:

- **substantially avoids getting stuck in local modes** of $$f(N,E \mid D)$$; and
- **converges faster** than common alternatives such as the MH sampler.

## A companion result: sampling graphs uniformly

In a related paper (*Electronic Notes in Discrete Mathematics*, 2016) we used the same Neighbourhood sampler for
a combinatorial problem: **sampling directed and undirected graphs uniformly at random, conditional on vertex
connectivity**. We compared its computational efficiency against the conventional MH sampler. Uniform graph
samplers like this are the building blocks of null models in network science, for example to test whether a motif
appears more often than chance.

## From theory to tools

These samplers, together with the **Hit-and-Run (HAR)** sampler, were implemented in our
[BNMCMC software](/blog/2018/bnmcmc-software/) and later used to infer causal signalling networks in
[PathTurbEr](/blog/2021/pathturber-perturbation-drivers/).
