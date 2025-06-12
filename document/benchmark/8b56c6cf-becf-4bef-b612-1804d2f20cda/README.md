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
Github:  https://github.com/SilongYong/SQA3D
Hugging face: null
Project: https://sqa3d.github.io/
default:
  property: Total
properties:
  EM:
    order: 0
    index: 0
    label: EM
    unit: null
  Total:
    order: 1
    index: 1
    label: Total Score
    unit: null
---

## Benchmark Introduction

![alt text](assets/1-1.png)

A new benchmark for embodied scene understanding, aiming at bridging the gap between 3D scene understanding and embodied AI. Given a scene context (e.g., 3D scan), SQA3D requires the tested agent to first understand its situation (position, orientation, etc.) in the 3D scene as described by text, then reason about its surrounding environment and answer a question under that situation. Based upon 650 scenes from ScanNet, we provide a dataset centered around 6.8k unique situations, along with 20.4k descriptions and 33.4k diverse reasoning questions for these situations. These questions examine a wide spectrum of reasoning capabilities for an intelligent agent, ranging from spatial relation comprehension to commonsense understanding, navigation, and multi-hop reasoning.

## Benchmark Evaluation

SQA3D imposes a significant challenge to current multi-modal especially 3D reasoning models. We evaluate various state-of-the-art approaches and find that the best one only achieves an overall score of 47.20%, while amateur human participants can reach 90.06%.

## Citation
```
@inproceedings{ma2022sqa3d,
    title={SQA3D: Situated Question Answering in 3D Scenes},
    author={Ma, Xiaojian and Yong, Silong and Zheng, Zilong and Li, Qing and Liang, Yitao and Zhu, Song-Chun and Huang, Siyuan},
    booktitle={International Conference on Learning Representations},
    year={2023},
    url={https://openreview.net/forum?id=IDJx97BC38}


```
