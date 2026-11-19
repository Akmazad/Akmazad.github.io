---
title: "LandSin: privacy-preserving land-value estimation and habitability insights on the web"
method: LandSin
description: "A web application that pairs polynomial regression with differential privacy to estimate land values from local amenities, and adds affordability, habitability and terrain insights through Google Maps."
theme: ai
paper: landsin-2024
tags: [web server, differential privacy, regression, urban planning, Google Maps API]
math: true
---

Land-value estimates drive investment, taxation and regional planning, yet they are often opaque, slow to produce
and built on sensitive transaction data. **LandSin**, published in *Software Impacts* and developed in the lab with
collaborators, is a web application with a back-end database that makes land-value estimation **fast,
explainable and privacy-preserving**.

<!--more-->

## Ingredients

- **Polynomial regression** on property details and **local amenities**, capturing non-linear effects
  (a generic polynomial model is shown below):

$$
\hat{v} \;=\; \beta_0 + \sum_{k} \beta_k x_k + \sum_{k \le l} \beta_{kl}\, x_k x_l + \dots
$$

- **Differential privacy (DP)** to protect contributors' data. A DP mechanism adds calibrated noise so that the
  released outputs reveal almost nothing about any single record. Formally, a mechanism $$M$$ is
  $$\varepsilon$$-differentially private if, for neighbouring datasets $$D, D'$$ and any output set $$S$$,
  $$\Pr[M(D)\in S] \le e^{\varepsilon}\Pr[M(D')\in S]$$.
- **Google Maps integration** for terrain context and location-aware features.

## Features

- Land value and price **prediction** for a chosen location.
- **Affordability and habitability** analysis.
- **Terrain insights** from Google Maps.
- **Infographics** that highlight economically deprived but habitable areas.

## Who it is for

- **Real-estate agencies and investors:** assess opportunities and market trends with data-driven estimates.
- **Community planners and governments:** identify **economically deprived yet habitable** areas to target
  balanced regional development.
- **Individuals:** obtain informed estimates without exposing private data.

LandSin shows how standard statistical models, combined with modern privacy guarantees and good interface design,
can become **decision-support tools** for the public sector, a direction the lab is pursuing with grants on
public-sector analytics.
