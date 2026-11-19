---
title: "Type-I and Type-II cross-talks: categorising pathway cross-talk in data-driven signalling networks"
method: XDaMoSiN
description: "A categorisation of signalling cross-talk tailored to data-driven (undirected, context-specific) network models, plus a simple algorithm, XDaMoSiN, to detect both types between any two pathways."
theme: cancer
paper: xtalk-categorisation-2018
tags: [pathway cross-talk, signalling networks, network topology, systems biology]
math: true
---

"Cross-talk" is one of the most used and least precisely defined terms in signalling biology. Existing
definitions assume a **static, curated, directed** pathway map. However, the networks we infer from omics data,
such as the [p₁-model networks](/blog/2015/bayesian-signalling-cross-talk-drug-resistance/) of resistant cancer
cells, are **context-specific** and **undirected**. In this book chapter (IntechOpen, 2018) we reviewed existing
categorisations and proposed one that fits data-driven models.

<!--more-->

## Two types are enough

Treat a data-driven signalling network as an undirected graph and fix two pathways, $$P_a$$ and $$P_b$$, with
node sets that may overlap. We define:

- **Type-I cross-talk.** A signalling link $$\{g_i, g_j\}$$ **connects** the two pathways, with
  $$g_i \in P_a \setminus P_b$$ and $$g_j \in P_b \setminus P_a$$. Information flows across a bridge edge.
- **Type-II cross-talk.** Two links $$\{g_i, g_j\}$$ and $$\{g_j, g_k\}$$ **meet at a shared node**
  $$g_j \in P_a \cap P_b$$, with $$g_i$$ in one pathway and $$g_k$$ in the other. The pathways communicate through a
  common component.

<div class="diagram" role="img" aria-label="Type-I cross-talk is a bridging edge between two pathways; Type-II is two edges meeting at a shared node">
<svg viewBox="0 0 720 180">
  <text x="180" y="22" text-anchor="middle" font-size="13" font-weight="600">Type-I: bridging link</text>
  <ellipse cx="100" cy="100" rx="70" ry="55" fill="none" class="d-line" stroke-dasharray="4 4"/>
  <ellipse cx="260" cy="100" rx="70" ry="55" fill="none" class="d-line" stroke-dasharray="4 4"/>
  <text x="70" y="160" class="d-small">pathway A</text><text x="240" y="160" class="d-small">pathway B</text>
  <path class="d-line" d="M120 100 L240 100" stroke-width="2.5"/>
  <circle class="d-acc" cx="120" cy="100" r="15"/><text x="120" y="105" text-anchor="middle" font-size="12">gᵢ</text>
  <circle class="d-acc2" cx="240" cy="100" r="15"/><text x="240" y="105" text-anchor="middle" font-size="12">gⱼ</text>
  <text x="540" y="22" text-anchor="middle" font-size="13" font-weight="600">Type-II: shared node</text>
  <ellipse cx="490" cy="100" rx="80" ry="55" fill="none" class="d-line" stroke-dasharray="4 4"/>
  <ellipse cx="590" cy="100" rx="80" ry="55" fill="none" class="d-line" stroke-dasharray="4 4"/>
  <path class="d-line" d="M450 100 L540 100 L630 100" stroke-width="2.5"/>
  <circle class="d-acc" cx="450" cy="100" r="15"/><text x="450" y="105" text-anchor="middle" font-size="12">gᵢ</text>
  <circle class="d-box" cx="540" cy="100" r="15" stroke-width="2"/><text x="540" y="105" text-anchor="middle" font-size="12">gⱼ</text>
  <circle class="d-acc2" cx="630" cy="100" r="15"/><text x="630" y="105" text-anchor="middle" font-size="12">gₖ</text>
</svg>
</div>

When signalling activities are treated as **non-causal relationships**, as they are in correlation- or
ERGM-based network models, every cross-talk type defined by earlier, topology-based categorisations maps onto
Type-I or Type-II. The two-type scheme is therefore complete for this setting while being much simpler to compute.

## XDaMoSiN: detecting both types

We also gave a simple, intuitive algorithm, **XDaMoSiN** (*cross-talks in data-driven models of signalling
networks*). Given a network and two pathways, it:

1. partitions nodes into $$P_a$$-only, $$P_b$$-only and shared;
2. reports every edge between the two exclusive sets as a **Type-I** cross-talk; and
3. reports every pair of edges meeting at a shared node with endpoints in opposite pathways as a **Type-II** cross-talk.

## Why it is useful

Because the categorisation does not rely on prior directionality, it can be applied to **any context-specific
network** (resistant versus sensitive, tumour versus normal, infected versus uninfected) to reveal latent
mechanisms such as **acquired drug resistance** that emerge from the adaptable, dynamic nature of signal
transduction. The same logic underpins our later tools [XTalkiiS](/blog/2018/xtalkiis-inter-species-cross-talk/)
and [rXTalkViz](/blog/2024/rxtalkviz/).
