---
title: Embodied Arena Evaluation System
---

Embodied Arena extensively supports comprehensive evaluation of models
from different sources (i.e., open-source, closed-source) by different
means (e.g., model weights, API), offering flexibility and convenience
for users to join. For evaluation data, Embodied Arena integrates a
diverse range of existing well-curated Embodied AI benchmarks, and
moreover, it is greatly powered by a unique LLM-driven automated generation
pipeline for targeted evaluation data. Hence, Embodied Arena has prominent
superiorities in providing diverse scenarios and tasks, breaking the
scaling bottleneck of manually constructed data, keeping evaluation data
evolving and in blackbox thus ensuring a high-level safety.

Embodied Arena conducts comprehensive evaluation for each model across all
benchmarks and generative evaluation data. Different evaluation metrics are
adopted according to the characteristics of the benchmark or data.
Accuracies based on exact matching (i.e., Rule-based) and fuzzy matching
(i.e., Rule-based, LLM-based) are used for Embodied QA assessment; Success
Rate metrics (i.e., multimodal matching, interactive simulation-based
testing) are used for Embodied Navigation and Embodied Task Planning
evaluation. Evaluation results are normalized and summarized across
multiple benchmarks and capability dimensions accordingly, which arrives at
the evaluation scores. Finally, Embodied Arena presents the ranking of
models on three types of leaderboards and the radar plot in terms of seven
embodied capabilities for concise and intuitive comparison.
