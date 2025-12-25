---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: MineAnyBuild
code: mine-any-build
description: >
  MineAnyBuild: Benchmarking Spatial Planning for Open-world AI Agents
organization: Sun Yat-sen University
released:
  at:
    year: 2025
    month: 5
    date: 26
repository: https://github.com/MineAnyBuild/MineAnyBuild/tree/main
huggingface: https://huggingface.co/datasets/SaDil/MineAnyBuild
website: https://mineanybuild.github.io/
default:
  property: Total
capabilities:
  - Spatial Reasoning
  - Knowledge Reasoning
properties:
  SpatialReasoning:
    order: 1
    index: 0
    label: Spatial Reasoning
    unit: null
  SpatialCommonsense:
    order: 2
    index: 1
    label: Spatial Commonsense
    unit: null
  Total:
    order: 0
    index: 2
    label: Total Score
    unit: null
  PercentileRank:
    order: null
    index: 3
    label: PR
    unit: null
---

## Introduction

![alt text](assets/overview.png)

MineAnyBuild, a comprehensive benchmark to evaluate the spatial planning abilities of open-world AI agents in Minecraft, requires them to generate building plans from multi-modal instructions. It includes 4,000 curated tasks and supports scalable data collection through player-generated content, evaluating spatial understanding, reasoning, creativity, and commonsense. The evaluation reveals significant limitations but also great potential in current MLLM-based agents, highlighting the importance of MineAnyBuild for advancing spatial intelligence in AI.

## Evaluation

MineAnyBuild involves approximately 4,000 spatial planning tasks with 500+ buildings/indoor decoration assets. These tasks, including Executable Spatial Plan Generation, Spatial Understanding, Creativity, Spatial Reasoning, and Spatial Commonsense, correspond to diverse evaluation dimensions, thereby conducting a comprehensive assessment of AI agents’ spatial planning capabilities.

In Executable Spatial Plan Generation, Spatial Understanding, and Creativity tasks, the agent needs to generate executable spatial plans for building an architecture according to the given instructions. While in Spatial Reasoning and Spatial Commonsense tasks, MineAnyBuild introduces ~2,000 VQA pairs, where it asks the agent to answer the given questions, accompanied by the related images.

### Spatial Reasoning VQA Task

There are three main types of our Spatial Reasoning tasks in total, where selecting the same one from four stimuli, selecting the different one from four stimuli, and judging whether two stimuli can be obtained only by rotation.

<div align="center">
  <img src="assets/spatial_reasoning.png" alt="Spatial Reasoning Examples" style="width: 75%; max-width: 600px;">
</div>

### Spatial Commonsense VQA Task

Spatial Commonsense refers to humans’ intuitive understanding of spatial attributes such as the position, direction, distance, and shape of objects in the physical world, and it appears in every aspect of daily life. The most important types of spatial commonsense and explanations are listed as follows:

- **Rationality of object placement**: To estimate a contradiction between asset function and space and whether the size of an item is suitable for a certain space (e.g., _“a refrigerator should not be placed in the bathroom”_).
- **Navigation and sense of direction**: It requires agents to locate directions without previous information, and determine abnormal situations (e.g., _“you need to turn right when going upstairs” and “the chair can not be under the table”_).
- **Path planning**: It requires agents to avoid obstacles and bypass them rather than attempting to pass through a wall when conducting path planning.
- **Proximity commonsense**: It requires agents to make judgments based on spatial commonsense and intuition rather than precise measurement, just as humans judge distance.
- **Furniture placement**: For some common combinations of spatial object relationships, such as the orientation and position of table and chair arrangements, it requires agents to make correct judgments.
- **Spatial inclusion relationship**: If object A is completely inside container B, then the volume of A must be smaller than the internal space of B (e.g., _“a piano cannot fit into a chest”_).
- **Transitivity of topological relations**: If A is to the left of B and B is to the left of C, then A is usually to the left of C. However, agents need to make judgments and verifications based on actual visual observations. Humans can determine this transitivity without logical training, and it evaluates whether the agents can achieve it.
<div align="center">
  <img src="assets/commonsense.png" alt="Spatial Commonsense Examples" style="width: 75%; max-width: 600px;">
</div>

## Citation

```
@article{wei2025mineanybuild,
  title={MineAnyBuild: Benchmarking Spatial Planning for Open-world AI Agents},
  author={Wei, Ziming and Lin, Bingqian and Jiao, Zijian and Nie, Yunshuang and Ma, Liang and Liu, Yuecheng and Zhuang, Yuzheng and Liang, Xiaodan},
  journal={arXiv preprint arXiv:2505.20148},
  year={2025}
}
```
