---
title: "COVID-CDR: network pharmacology for prioritising COVID-19 drug combinations"
method: COVID-CDR
description: "An online platform that maps drug targets onto the SARS-CoV-2–host interactome inside the human PPI network to find drug pairs acting through different, complementary pathways."
theme: drugs
paper: "covid-cdr-2021, covid-cdr-data-2020"
tags: [COVID-19, combination therapy, network pharmacology, drug repositioning, interactome]
math: true
---

SARS-CoV-2 pathology is **multifactorial**: viral replication, immune dysregulation, cytokine storm and tissue
injury. A single repurposed drug rarely hits enough of these at once, which is why **combination therapy** is
attractive. But how do you choose which two drugs to combine, from thousands of candidates, before any trial?
**COVID-CDR** (COVID-19 Combinatorial Drug Repositioning), published in *Patterns* (Cell Press), offers a systematic,
visual and quantitative answer.

<!--more-->

## The network-pharmacology view

Everything is placed on one map, the **human protein–protein interaction (PPI) network**:

- the **SARS-CoV-2–host interactome**, the human proteins that viral proteins bind or perturb;
- the **primary targets** of each candidate drug.

A drug is a plausible COVID-19 candidate if its targets sit **close** to the virus–host module in the network. A
drug *pair* is a promising combination if the two drugs reach the disease module **through different, potentially
complementary routes**, covering more of the pathology with less redundancy.

## Prioritising pairs

A common way to formalise "close" in network medicine is the average shortest-path distance between a drug's
targets $$T$$ and a disease module $$S$$, for example

$$
d(T,S) \;=\; \frac{1}{|T|}\sum_{t \in T} \min_{s \in S} \operatorname{dist}(t,s),
$$

compared against randomised target sets to obtain a z-score. COVID-CDR combines such topological relations between
each drug's targets and the virus–host interactome with **multi-evidence drug–drug similarity** from
[DrugSimDB](/blog/2020/drugsimdb/). The goal is to surface pairs whose targets are individually relevant but
mechanistically **complementary** rather than redundant.

## What the platform offers

- **Interactive visualisation** of drug targets, viral–host proteins and their paths in the PPI network.
- **Quantitative scores** for individual drugs and drug pairs.
- **Multi-evidence drug-pair similarity** breakdowns (chemical, target, functional, pathway).
- Supporting information on each drug and pair, so clinicians and researchers can check the rationale.

To our knowledge COVID-CDR was the **first online platform** for systematic, pre-clinical in-silico investigation of
combination therapies for COVID-19.

## Data and follow-ups

The full resource is archived on **Dryad** ([doi:10.5061/dryad.905qfttjm](https://doi.org/10.5061/dryad.905qfttjm)),
with an earlier preprint on ChemRxiv. The same network-medicine logic led to our analysis of the
[cyclosporine–selinexor combination](/blog/2024/cyclosporine-selinexor-network-medicine/) and the proposed
**NovexSyn.ai** project on synergistic antivirals for new variants.
