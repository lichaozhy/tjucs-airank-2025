---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: VSI
description: >
  Thinking in Space: How Multimodal Large Language Models See, Remember and Recall Spaces
organization: New York University
released:
  at:
    year: 2024
    month: 12
    date: 18
repository: https://github.com/vision-x-nyu/thinking-in-space
huggingface: null
website: https://vision-x-nyu.github.io/thinking-in-space.github.io/
default:
  property: Total
capabilities:
  - Object Property
  - Object Count
  - Spatial Relationship
  - Spatial Distance
  - Spatial Size
  - Temporal Order
  - Basic Planning
properties:
  ObjectCount:
    order: 1
    index: 0
    label: Object Count
    unit: null
  AbsoluteDistance:
    order: 2
    index: 1
    label: Absolute Distance
    unit: null
  ObjectSize:
    order: 3
    index: 2
    label: Object Size
    unit: null
  RoomSize:
    order: 4
    index: 3
    label: Room Size
    unit: null
  RelativeDistance:
    order: 5
    index: 4
    label: Relative Distance
    unit: null
  RelativeDirection:
    order: 6
    index: 5
    label: Relative Direction
    unit: null
  RoutePlan:
    order: 7
    index: 6
    label: Route Plan
    unit: null
  AppearanceOrder:
    order: 8
    index: 7
    label: Appearance Order
    unit: null
  Total:
    order: 0
    index: 8
    label: Total Score
    unit: null
---

## Introduction

![alt text](assets/1-1.png)

VSI-Bench quantitatively evaluates the visual-spatial intelligence of MLLMs from egocentric video. VSI-Bench comprises over 5,000 question-answer pairs derived from 288 real videos. These videos are sourced from the validation sets of the public indoor 3D scene reconstruction datasets ScanNet, ScanNet++, and ARKitScenes, and represent diverse environments including residential spaces, professional settings (e.g., offices, labs), and industrial spaces (e.g., factories) and multiple geographic regions. By repurposing these existing 3D reconstruction and understanding datasets, VSI-Bench benefits from accurate object-level annotations, which are used in question generation and could support future studies exploring the connection between MLLMs and 3D reconstruction.

## Benchmark Characteristics

- **Purpose**: The benchmark specifically focuses on visual-spatial intelligence in real-world environments, requiring capabilities like visual working memory and implicit scene reconstruction, going beyond general video understanding.
- **Quality**: The benchmark is high-quality, having undergone iterative human review to minimize ambiguity in questions and correct incorrect annotations from the source datasets.

## Data Statistics

- **Data Source**: It comprises over 5,000 question-answer pairs derived from 288 real indoor-scene videos. These videos are sourced from existing public indoor 3D scene reconstruction datasets: ScanNet, ScanNet++, and ARKitScenes. The datasets were chosen for their diverse environments (residential, professional, industrial) and accurate object-level annotations.

| ![](assets/1-2.png) | ![](assets/1-3.png) |
|---------------------|---------------------|

## Evaluation

VSI-Bench evaluates performance using two metrics: for multiple-choice questions, Accuracy is used, calculated based on exact matches. For numerical-answer questions, a new metric called MRA (Mean Relative Accuracy) is introduced to assess how closely model predictions align with ground truth values. Out-of-the-box evaluation of VSI-Bench in GitHub repository, including the metrics implementation used in our framework
## Citation

```
@article{yang2024think,
    title={{Thinking in Space: How Multimodal Large Language Models See, Remember and Recall Spaces}},
    author={Yang, Jihan and Yang, Shusheng and Gupta, Anjali and Han, Rilyn and Fei-Fei, Li and Xie, Saining},
    journal={arXiv preprint arXiv:2412.14171},
    year={2024}
}

```
