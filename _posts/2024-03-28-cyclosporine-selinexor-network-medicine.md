---
title: "Cyclosporine + selinexor against SARS-CoV-2: a network-medicine case for complementary exposure"
method: "Network proximity & separation"
description: "Interactome-based proximity, functional proximity and topological separation show that cyclosporine and selinexor target complementary SARS-CoV-2 modules, viral replication and cytokine storm."
theme: drugs
paper: cyclosporine-selinexor-2024
tags: [network medicine, drug combination, SARS-CoV-2, interactome, network separation]
math: true
---

Two hallmark features of severe COVID-19 are **enhanced viral replication** and a subsequent **cytokine storm**.
Two existing drugs had each shown activity against SARS-CoV-2 through one of these routes:

- **cyclosporine**, an immunosuppressant (relevant to the cytokine storm);
- **selinexor**, an inhibitor of the nuclear export protein XPO1 (relevant to viral replication).

Because the pathology is multifactorial, a monotherapy is unlikely to be optimal. We asked whether
**network medicine** supports combining them.

<!--more-->

## The framework

All analyses run on an **integrated human interactome**. For each drug we define a *drug module* (its targets in the
network) and compare it with **SARS-CoV-2 disease modules** (host proteins perturbed by infection).

1. **Disease proximity:** are a drug's targets closer to the disease module than random target sets? We compute a
   network distance and assess it against randomised expectations.
2. **Functional proximity:** do the drug and disease modules share enriched biological functions?
3. **Topological separation** between the two drug modules $$A$$ and $$B$$, for example with the separation measure widely used in
   network medicine:

$$
s_{AB} \;=\; \langle d_{AB} \rangle \;-\; \frac{\langle d_{AA} \rangle + \langle d_{BB} \rangle}{2},
$$

where $$\langle d_{AB}\rangle$$ is the mean shortest distance between the two modules and $$\langle d_{AA}\rangle$$ and
$$\langle d_{BB}\rangle$$ are the within-module distances. A **positive** $$s_{AB}$$ means the two drugs act on
topologically **separate** neighbourhoods.

All results are tested for statistical significance.

## Findings

- **Both drug-target modules are highly proximal to SARS-CoV-2 disease modules**, topologically and functionally,
  and significantly so for each drug on its own.
- **Functional enrichment** shows the two drugs target functions related to **viral replication** and
  **cytokine storm**, respectively.
- The two drug modules are **well separated** in the network. Each drug hits the disease module, but from a different
  side: a pattern known as **complementary exposure**, which network-medicine studies have associated with
  effective combinations.

## Implication

Cyclosporine plus selinexor is a rational candidate combination that warrants **in vitro and in vivo testing**, and
ultimately clinical evaluation. The analysis also illustrates the general workflow we first built into
[COVID-CDR](/blog/2021/covid-cdr-combination-therapy/), now being extended to cancer in the proposed **Onco-CDR**
platform.
