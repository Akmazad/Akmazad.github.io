---
title: "COVIDSpread: real-time, customisable time-series forecasting of COVID-19 spread"
method: COVIDSpread
description: "A unified platform that couples live COVID-19 data visualisation with non-linear time-series models that users can fit to any window of the data, for short-term forecasts."
theme: health
paper: covidspread-2021
tags: [COVID-19, forecasting, time series, epidemiology, R Shiny]
math: true
---

During the pandemic, dashboards visualised COVID-19 case counts everywhere, but **visualisation is not
prediction**. Very few tools let people move from "what happened" to "what is likely to happen next week" using
the same real-time data. **COVIDSpread**, developed with Sahar Shahriari, Taha Hossein Rashidi and Fatemeh Vafaee at
UNSW and published in *F1000Research*, fills that gap.

<!--more-->

## Design goals

1. **Real-time:** work from the latest available data.
2. **Statistical, not just visual:** fit forecasting models within the same platform used to explore the data.
3. **Customisable:** let users decide *which* part of the epidemic curve to model, for example only the period
   after a lockdown began, because the dynamics change with interventions.
4. **Accessible:** usable by lay users and by experts.

## Models

Epidemic curves are rarely linear: growth accelerates, saturates and responds to interventions. COVIDSpread
therefore relies on **time-series models able to capture non-linearity**. A generic short-term forecast takes the
form

$$
\hat{y}_{t+h} \;=\; g\big(y_t, y_{t-1}, \dots, y_{t-p};\, \hat\theta\big), \qquad h = 1,\dots,H,
$$

where $$y_t$$ is the (possibly transformed) count on day $$t$$, $$g$$ is the fitted model and $$H$$ is a short horizon.
Users can develop **several customised models with different restrictions**, such as a model fitted only to a
chosen time window, and compare their forecasts side by side.

## Why time windows matter

Fitting one model to the whole pandemic blends regimes: pre-intervention growth, lockdown decline and reopening
waves. Restricting the window to the current regime gives forecasts that reflect present dynamics. Comparing
windows is also a quick way to **assess the effect of an intervention**, which was the focus of our earlier medRxiv
preprint, *Real-time time-series modelling for prediction of COVID-19 spread and intervention assessment* (2020).

## Access

The platform (originally released as "COVID-19 TS") was hosted by the Vafaee Lab at UNSW and is no longer online.
The methodology and its evaluation are
described in the open-access paper below.
