---
title: "VToD: voting-based cancer module identification from copy number, expression and PPI networks"
method: VToD
description: "A module-detection algorithm that lets data-driven gene–gene relationships and protein-interaction topology vote together, recovering cancer-related pathways in glioblastoma and ovarian carcinoma."
theme: cancer
paper: "voting-module-2013, cancer-module-chapter-2017, netrecon-giw-2011"
tags: [cancer modules, data integration, copy number aberration, gene expression, PPI network, TCGA]
math: false
---

Cancer genomes are disrupted at several levels at once: genes are **amplified or deleted** (copy number
aberrations, CNAs) and their **expression** shifts. Either data type alone gives a partial view. **VToD**
(Voting-based cancer module identification by combining **To**pological and **D**ata-driven properties)
integrates both with the protein–protein interaction (PPI) network to find *functional modules*: groups of
genes that act together in cancer.

<!--more-->

## Step 1: a gene–gene relationship network from the data

Starting from a set of seed genes, we enumerate **every type of pairwise correlation** across patients:

- **GE–GE**: two genes whose expression levels co-vary;
- **CNA–GE**: a gene's copy number tracks another gene's expression, a possible *cis* or *trans* dosage effect;
- **CNA–CNA**: two genes that are co-amplified or co-deleted.

Each significant correlation becomes an edge, giving a *data-driven* network that reflects what is happening in
the tumours.

## Step 2: let topology and data vote

PPI networks capture what proteins *can* do together; the data-driven network captures what they *appear* to do
in these patients. VToD grows modules by a **voting scheme**: a candidate gene joins a module when it is
supported both by its *topological* connections in the PPI network and by its *data-driven* relationships to the
current members. Requiring agreement filters out spurious correlations, which have no physical interaction to
support them, and inactive interactions, which have no data to support them.

<div class="diagram" role="img" aria-label="VToD combines a data-driven gene-gene network and a PPI network through voting to produce modules">
<svg viewBox="0 0 720 140">
  <rect class="d-acc2" x="10" y="14" width="200" height="48" rx="10"/><text x="110" y="35" text-anchor="middle" font-size="13">Data-driven network</text><text x="110" y="52" text-anchor="middle" class="d-small">GE–GE · CNA–GE · CNA–CNA</text>
  <rect class="d-acc" x="10" y="80" width="200" height="48" rx="10"/><text x="110" y="101" text-anchor="middle" font-size="13">PPI network</text><text x="110" y="118" text-anchor="middle" class="d-small">topological evidence</text>
  <rect class="d-box" x="270" y="47" width="170" height="48" rx="10"/><text x="355" y="76" text-anchor="middle" font-size="13">Voting-based growth</text>
  <rect class="d-acc2" x="500" y="47" width="210" height="48" rx="10"/><text x="605" y="68" text-anchor="middle" font-size="13">Cancer modules</text><text x="605" y="85" text-anchor="middle" class="d-small">KEGG · BioCarta · GO · CGC</text>
  <path class="d-line" d="M210 38 L270 71 M210 104 L270 71 M440 71 L500 71" stroke-width="1.5"/>
</svg>
</div>

## Results on TCGA cohorts

We applied VToD to **266 glioblastoma multiforme (GBM)** and **96 ovarian carcinoma (OVC)** samples that had
both expression and copy number measurements.

| | GBM | OVC |
|---|---|---|
| Modules identified | 22 | 23 |
| Enriched in cancer-related KEGG pathways | 15 | 19 |
| Enriched in BioCarta pathways | 12 | 18 |
| Enriched in GO terms | 20 | 23 |
| Enriched in Cancer Gene Census genes | 9 | 15 |

VToD significantly outperformed existing module-detection methods on both functional and cancer-gene-set
enrichment. Modules containing **more types of gene–gene relationships** were more strongly enriched for
cancer genes (correlation 0.64 in GBM, 0.49 in OVC). In other words, the modules where expression changes and
CNAs converge are the ones that best explain cancer biology.

## Where it led

VToD grew out of my MS thesis at GIST, presented first at GIW 2011. It was later reviewed alongside other integrative
module-finding methods in a *Methods in Molecular Biology* chapter (2017). The theme of making several kinds of
evidence agree before trusting a network edge runs through our later work on DrugSimDB and pathway cross-talk.
