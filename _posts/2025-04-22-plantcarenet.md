---
title: "PlantCareNet: plant-disease diagnosis with dual-mode recommendations"
method: PlantCareNet
description: "A lightweight CNN diagnoses plant diseases from leaf images (82–97% accuracy across five datasets, 2.1 ms inference) and returns both automated and expert-guided treatment advice."
theme: ai
paper: plantcarenet-2025
tags: [deep learning, CNN, plant disease, agriculture, decision support]
math: false
---

Plant diseases cut yields and threaten food security, and farmers often lack quick access to an expert who can
diagnose a disease *and* say what to do about it. **PlantCareNet**, published in *Plant Methods* with colleagues at
the University of Dhaka and IMSIU, is an end-to-end system that does both from a single leaf photograph.

<!--more-->

## Dual-mode design

1. **Diagnosis (deep learning).** A convolutional neural network examines the leaf image. The final convolutional
   block is flattened and passed through fully connected layers (**Dense-100 → Dense-35**) to classify the disease
   class.
2. **Recommendation (knowledge base).** Once a disease is identified, PlantCareNet immediately offers two kinds of
   advice:
   - **automated suggestions** derived from the identified symptoms; and
   - **expert-guided advice** for personalised treatment, drawn from a knowledge base curated with domain experts.

Pairing AI recognition with expert consultation is what makes the system actionable rather than just a classifier.

## Results

<div class="keyfacts">
  <div><b>5</b><span>public plant-disease datasets</span></div>
  <div><b>82–97%</b><span>accuracy across datasets</span></div>
  <div><b>97%</b><span>precision</span></div>
  <div><b>0.0021 s</b><span>average inference time</span></div>
</div>

PlantCareNet **outperformed well-known architectures such as Inception and ResNet** in most cases, and surpassed
other lightweight CNNs, while remaining fast enough for real-time use on modest hardware.

## Why lightweight matters

Large models are accurate but slow and expensive to deploy in the field. A compact CNN with millisecond inference
can run on phones or edge devices, putting **rapid diagnosis and remedy** in farmers' hands, which supports more
sustainable agricultural practice.
