---
title: Beacon3D-QA(2D) Benchmark Evaluation Report—The Main Challenges of Object Perception in Complex Scenes Lie in Object Classification and Appearance Attribute Recognition
code: Beacon3D-QA(2D)
abstract: Beacon3D, published in CVPR 2025, is a benchmark with the paper titled "Unveiling the Mist over 3D Vision-Language Understanding," jointly proposed by the Beijing Institute for General Artificial Intelligence (BIGAI), Peking University, and Tsinghua University. This benchmark aims to deeply analyze a model's visual-language understanding capabilities in complex 3D scenes through an object-centric evaluation framework. This evaluation focuses on the 2D version of the benchmark.
at: 2026-1-16
---

## Beacon3D-QA(2D) Benchmark Evaluation Report—The Main Challenges of Object Perception in Complex Scenes Lie in Object Classification and Appearance Attribute Recognition

## 1. Benchmark Introduction

### 1.1 Source

Beacon3D, published in CVPR 2025, is a benchmark with the paper titled "Unveiling the Mist over 3D Vision-Language Understanding," jointly proposed by the Beijing Institute for General Artificial Intelligence (BIGAI), Peking University, and Tsinghua University. This benchmark aims to deeply analyze a model's visual-language understanding capabilities in complex 3D scenes through an object-centric evaluation framework. This evaluation focuses on the 2D version of the benchmark.

- Project Homepage: [beacon-3d.github.io](http://beacon-3d.github.io)

- Paper: https://arxiv.org/abs/2503.22420

- Leaderboard: [embodied-arena.com](http://embodied-arena.com)

### 1.2 Dataset Overview

Beacon3D-QA(2D) contains **4,890** test samples (based on 2,445 unique 3D questions, each evaluated from two different perspectives). It is mainly divided into two core categories, covering 5 sub-capabilities:

- **Object Perception**:

    - **Class**: Covers semantic recognition of object categories in 3D scenes (e.g., recognizing "picture frame" and "trash can").

    - **Appearance**: Covers visual feature recognition such as color, texture, and material.

    - **Geometry:** Covers the recognition of physical features such as shape and structure.

    - **Existence:** Covers the determination of whether an object exists.

- **Spatial Perception:**

    - **Spatial Relationships:** Covers the determination of the relative position and layout between objects (e.g., "next to," "above").

Each sample includes: a multimodal context description (2D viewpoint image), the corresponding question-answer pair, and viewpoint information. The core objective is to evaluate the model's grounded reasoning capability for fine-grained visual features and spatial relationships in specific contexts.

**QA Example (Object Perception - Appearance):**

- **Input Image:** [A viewpoint image of a room containing multiple picture frames]

- **Question:** What color is the largest picture?

- **Reasoning Chain:**

    1. **Geometry:** Identify the size of all picture frames in the scene and locate the "largest" one.

    2. **Appearance:** Extracts the color features of the target object.

- **Answer:** Blue and pink

### 1.3 Evaluation Metrics

- **Scoring Logic:** Employs **Rule-based Substring Matching**. The system checks whether the model's generated answer contains the core keywords (Ground Truth) of the standard answer. For example, if the standard answer is "Blue," a model answer of "It is blue" is considered correct.

- **Total Score:** The average accuracy (out of 100) across all test samples.

## 2. Evaluation Overview

### 2.1 Evaluation Settings

This evaluation is conducted in a 2D image modality. The input includes a scene image and the corresponding question. Compared to pure text or structured data tasks, this setting places higher demands on the model's vision encoding capability and cross-modal alignment capabilities.

### 2.2 Overall Ranking

A total of **22** models were evaluated in this evaluation, with **o3** ranking first (69.77%).

Top-3 Models

| **Rank** | **Model**       | **Total** |
|----------|-----------------|-----------|
| 🥇       | o3              | 69.77%    |
| 🥈       | o4_mini         | 68.24%    |
| 🥉       | Qwen-VL-Max     | 61.27%    |


### 2.3 Group Comparison

Models are divided into two groups based on their source:

| **Group**                          | **Number** | **Mean**  | **Range** | **SOTA**               |
|------------------------------------|------------|-----------|-----------|------------------------|
| **Closed-Source General Knowledge** | 7          | 57.65%    | 42%–70%   | o3 (69.77%)            |
| **Open-Source General Knowledge**   | 7          | 49.31%    | 46%–52%   | InternVL3-38B (52.00%) |
| **Embodied Models**                | 8          | 45.81%    | 39%–52%   | RoboBrain 1.0-7B (52.03%) |


**Trend Analysis**: Closed-source general-purpose models hold a significant advantage in visual understanding tasks, with a clear gap in scores among top models; open-source and embodied-specific models are generally in the second tier, but show a catching-up trend in specific tasks.

### 2.4 Difficulty Distribution

Class difficulty is measured by the overall model mean (lower values ​​indicate greater difficulty):

| **Difficulty**       | **Class**   | **Mean** |
|----------------------|-------------|----------|
| 🔴 **Most Difficult** | **Class**   | 24.3%    |
| 🟠                   | **Spatial** | 50.6%    |
| 🟠                   | **Geometry**| 50.8%    |
| 🟢                   | **Appearance** | 52.6%  |
| 🟢 **Relatively Easy**| **Existence**| 57.7%   |


**Conclusion**: The main challenges are concentrated in **Object Classification**. Due to the prevalent occlusion and unconventional viewpoints in 3D scenes, the model struggles to accurately define object categories; **Appearance** is the second most challenging aspect, and fine-grained texture recognition still presents a significant hurdle; **Existence detection** is a fundamental capability that current models have mastered relatively well.


Best Models for Each Category  

| **Category** | **Best Model** | **Score** |
|--------------|----------------|-----------|
| **Class**    | o3             | 45.86%    |
| **Spatial**  | o3             | 72.33%    |
| **Geometry** | o3             | 72.86%    |
| **Appearance** | o3           | 70.25%    |
| **Existence**| GPT-4o         | 73.80%    |

*Note: **Gemini-2.5-Pro** scored 63.53% in the **Spatial** dimension, second only to the o3/o4 series, and better than Qwen-VL-Max and GPT-4o, demonstrating its significant advantage in spatial reasoning. *

## 3. Analysis

### 3.1 Benchmark Validity

- **Significant Discrimination:** The significant difference in scores between top-performing models (~70 points) and bottom-performing models (~39 points), with no model reaching 80+ points, indicates that the benchmark is not yet saturated and can effectively measure the model's capability boundaries.

- **Moderate Data Scale:** The nearly 5000 samples are of a medium to large scale for 2D embodied QA, sufficient to support the statistical conclusions.

### 3.2 Coverage and Limitations

- **Perceptual Coverage:** The evaluation comprehensively covers object classification, appearance, geometry, and spatial relationships. However, the low score in the **Class** dimension (mean only ~24%) precisely exposes the current model's weakness in **basic object recognition** in complex 3D scenes (such as occlusion, truncation, and unconventional viewpoints). In contrast, the model's capability to recognize textures and materials is significantly better than its capability to determine object categories.

- **Missing Dimensions:** Currently, the focus is on static visual perception, and reasoning dimensions closely related to embodied action, such as **Affordance (functional visibility)** and **Planning**, are not yet included.

### 3.3 Performance Attribution

- **Advantage of the General Knowledge Base:** The performance of Qwen-VL-Max and Gemini-2.5-Pro ​​demonstrates that the generalization capability provided by a strong basic visual-language base model is more critical than small-scale embodied fine-tuning when handling complex scenarios.

- **Risk of Catastrophic Forgetting:** Comparison with the RoboBrain series reveals that version 2.0 (Total 43.66) is lower than version 1.0 (Total 52.03), especially with a significant drop in the Appearance dimension. This indicates that during large-scale embodied alignment, the model may overfit specific instructions, leading to a degradation of general visual perception capabilities.

- **Improvement Directions**:

    1. **Enhanced Fine-Grained Perception**: Introduce a high-resolution visual encoder or multi-scale attention mechanism to address the appearance bottleneck.

    2. **Data Hybridization Strategy**: Retain a certain proportion of general 2D QA data (Replay) when training the embodied model to prevent the forgetting of basic perceptual capabilities.
