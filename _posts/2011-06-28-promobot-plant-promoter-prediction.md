---
title: "PromoBot: finding plant promoters with hexamers and random triplet pairs"
method: PromoBot
description: "Two feature-selection algorithms, one frequency-based and one driven by a genetic algorithm, feed an SVM that recognises plant promoter sequences with 89% sensitivity and 86% specificity."
theme: omics
paper: plant-promoter-2011
tags: [promoter prediction, feature selection, genetic algorithm, SVM, plant genomics]
math: true
---

Every gene needs a **promoter**, the stretch of DNA upstream of the transcription start site where the
transcription machinery assembles. As plant genomes were sequenced at an accelerating pace, annotating
promoters computationally became a bottleneck: existing predictors were either tuned for animal genomes or
struggled to separate genuine promoters from the rest of the sequence. PromoBot was our answer.

<!--more-->

## The problem: which short words matter?

A promoter is recognisable by its *composition*: short DNA "words" (motifs) appear more or less often than
they would in non-promoter DNA. The challenge is deciding **which words to count**. With 4 nucleotides
there are $$4^6 = 4096$$ possible hexamers, and most of them are noise. Feeding all of them to a classifier
overfits; choosing too few misses the signal.

## Key idea: two complementary feature selectors

We treated a hexamer as a **pair of triplets** and designed two ways to choose informative pairs:

1. **FDAFSA, the Frequency Distribution Analyzed Feature Selection Algorithm.** For *adjacent* triplet pairs
   (ordinary hexamers), compare their frequency distributions in promoters versus non-promoters and keep the
   hexamers whose frequencies differ most.
2. **RTPFSGA, the Random Triplet Pair Feature Selecting Genetic Algorithm.** Allow the two triplets to be
   *non-adjacent*, separated by a gap, which captures spaced motifs that a plain hexamer count misses. The search
   space of such random triplet pairs (RTPs) is huge, so a **genetic algorithm** evolves subsets of RTPs whose
   frequencies best discriminate the two classes.

The selected features from both algorithms are combined and passed to a **support vector machine (SVM)** with
a non-linear kernel, which learns the promoter / non-promoter boundary:

$$
f(\mathbf{x}) = \operatorname{sign}\Big(\sum_i \alpha_i y_i \, K(\mathbf{x}_i, \mathbf{x}) + b\Big),
$$

where $$\mathbf{x}$$ is the vector of selected hexamer and RTP frequencies for a sequence.

<div class="diagram" role="img" aria-label="PromoBot pipeline: sequences go through FDAFSA and RTPFSGA feature selection, then an SVM classifier">
<svg viewBox="0 0 720 150">
  <rect class="d-box" x="10" y="50" width="130" height="50" rx="10"/><text x="75" y="80" text-anchor="middle" font-size="13">DNA sequences</text>
  <rect class="d-acc" x="190" y="12" width="170" height="50" rx="10"/><text x="275" y="35" text-anchor="middle" font-size="13">FDAFSA</text><text x="275" y="52" text-anchor="middle" class="d-small">adjacent hexamers</text>
  <rect class="d-acc2" x="190" y="88" width="170" height="50" rx="10"/><text x="275" y="111" text-anchor="middle" font-size="13">RTPFSGA</text><text x="275" y="128" text-anchor="middle" class="d-small">GA over spaced triplet pairs</text>
  <rect class="d-box" x="410" y="50" width="130" height="50" rx="10"/><text x="475" y="80" text-anchor="middle" font-size="13">Feature vector</text>
  <rect class="d-acc" x="590" y="50" width="120" height="50" rx="10"/><text x="650" y="80" text-anchor="middle" font-size="13">SVM → promoter?</text>
  <path class="d-line" d="M140 75 L190 37 M140 75 L190 113 M360 37 L410 75 M360 113 L410 75 M540 75 L590 75" stroke-width="1.5"/>
</svg>
</div>

## Data and validation

- **Promoters:** PlantProm database.
- **Non-promoters:** plant mRNA, rRNA and tRNA from PlantGDB, plus plant miRNAs from miRBase, so the negatives
  look like real genomic sequence rather than random strings.
- **Protocol:** 5-fold cross-validation, with feature selection run *inside* each training fold to avoid information leakage.

## Results

<div class="keyfacts">
  <div><b>89%</b><span>sensitivity</span></div>
  <div><b>86%</b><span>specificity</span></div>
  <div><b>5</b><span>competing predictors compared</span></div>
</div>

PromoBot performed as well as or better than the five other algorithms we compared against. The lesson that
carried into our later work is that **careful, biologically motivated feature selection** (here, spaced
triplet pairs) can matter as much as the classifier itself.

## Why it still matters

Spaced k-mer features later became standard in genomics deep learning, through gapped k-mer SVMs and dilated
convolutions. PromoBot was an early demonstration that non-adjacent sequence patterns carry regulatory signal.
