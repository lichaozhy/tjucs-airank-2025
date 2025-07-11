---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: SQA3D
description: >
  SQA3D: Situated Question Answering in 3D Scenes
organization: Beijing Institute for General Artificial Intelligence (BIGAI), UCLA, Tsinghua University, Peking University
released:
  at:
    year: 2023
    month: 1
    date: 30
repository: https://github.com/SilongYong/SQA3D
huggingface: null
website: https://sqa3d.github.io/
default:
  property: Total
capabilities:
  - Spatial Reasoning
properties:
  EM:
    order: 1
    index: 0
    label: EM
    unit: null
  Total:
    order: 0
    index: 1
    label: Total Score
    unit: null
---

## Introduction

![alt text](assets/1-1.png)

SQA3D is a benchmark designed for embodied scene understanding, aiming to bridge the gap between 3D scene comprehension and embodied AI. In the SQA3D task, the tested agent must first comprehend its situation within a 3D environment—such as position and orientation—based on a textual description. It then reasons about the surrounding scene and answers a corresponding question. The benchmark is constructed using 650 scenes from the ScanNet dataset, encompassing approximately 6.8k unique situations. It includes 20.4k textual descriptions and 33.4k diverse reasoning questions tailored to these situations. These questions evaluate a broad spectrum of reasoning capabilities in intelligent agents, including spatial understanding, commonsense reasoning, navigation, and multi-hop inference.

## Benchmark Characteristics

- **Purpose**: To quantitatively evaluate the visual-spatial intelligence of Multimodal Large Language Models (MLLMs) and assess their embodied reasoning capabilities.
- **Reasoning Focus**: Requires models to register objects across multiple frames and reason about object affordances and 3D relationships within a scene.
- **Data Collection**: Questions are manually labeled to ensure quality and correctness. Images are either self-taken or sourced from various robotics datasets like OXE, UMI Data, MECCANO, HoloAssist, and EGTEA Gaze+.
- **Complementary Nature**: Designed to complement existing VLM benchmarks that often focus on more atomic visual understanding tasks.

![alt text](assets/1-2.png)

## Data Statistics

- **Total Questions**: 400 multiple-choice questions.
- **Multi-Image Questions**: 28% of questions include more than one image, posing a greater challenge.

![alt text](assets/1-3.png)

## Evaluation

SQA3D presents a significant challenge to current multi-modal, especially 3D reasoning models. Various state-of-the-art approaches were evaluated, with the best-performing model achieving only an overall score of 47.20%. In contrast, amateur human participants reached an impressive score of 90.06%.

## Citation

```
@inproceedings{ma2022sqa3d,
    title={SQA3D: Situated Question Answering in 3D Scenes},
    author={Ma, Xiaojian and Yong, Silong and Zheng, Zilong and Li, Qing and Liang, Yitao and Zhu, Song-Chun and Huang, Siyuan},
    booktitle={International Conference on Learning Representations},
    year={2023},
    url={https://openreview.net/forum?id=IDJx97BC38}
}

```
