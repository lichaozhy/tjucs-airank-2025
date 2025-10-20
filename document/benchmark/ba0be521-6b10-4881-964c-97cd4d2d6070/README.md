---
id: ba0be521-6b10-4881-964c-97cd4d2d6070
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: OpenEQA
code: open-eqa
description: >
  OpenEQA: Embodied Question Answering in the Era of Foundation Models
organization: Meta
released:
  at:
    year: 2024
    month: null
    date: null
repository: https://github.com/facebookresearch/open-eqa
huggingface: null
website: https://open-eqa.github.io/
default:
  property: Total
capabilities:
  - Object Type
  - Object Property
  - Object State
  - Spatial Localization
  - General Knowledge
  - Spatial Reasoning
  - Knowledge Reasoning
properties:
  ObjectType:
    order: 1
    index: 0
    label: Object Recognition
    unit: null
  ObjectProperty:
    order: 2
    index: 1
    label: Attribute Recognition
    unit: null
  ObjectState:
    order: 3
    index: 2
    label: Object State Recognition
    unit: null
  Affordance:
    order: 4
    index: 3
    label: Functional Reasoning
    unit: null
  WorldKnowledge:
    order: 5
    index: 4
    label: World Knowledge
    unit: null
  ObjectLocalization:
    order: 6
    index: 5
    label: Object Localization
    unit: null
  SpatialReasoning:
    order: 7
    index: 6
    label: Spatial Reasoning
    unit: null
  Total:
    order: 0
    index: 7
    label: Total Score
    unit: null
  PercentileRank:
    order: null
    index: 8
    label: PR
    unit: null
---

## Introduction

![alt text](assets/2-1.png)

OpenEQA is the first open-vocabulary benchmark dataset for EQA supporting both episodic memory and active exploration use cases. OpenEQA contains over 1600 high-quality human generated questions drawn from over 180 real-world environments. OpenEQA stands out as a straightforward, measurable, and practically relevant benchmark that poses a considerable challenge to current generation of AI models.

## Data Statistics

Example questions and dataset statistics of OpenEQA. The episode history H provides a human-like tour of a home. EQA agents must answer diverse, human-generated questions Q from 7 EQA categories, aiming match the ground answers A\*. Tours are collected from diverse environments including home and office locations (not shown above). Dataset statistics (right) break down the question distribution by video source (top), question category (middle), and episodic memory vs active setting. Note that, by design, the HM3D questions are shared across the EM-EQA and A-EQA settings.

## Evaluation

Illustration of LLM-Match evaluation and workflow. While the open-vocabulary nature makes EQA realistic, it poses a challenge for evaluation due to multiplicity of correct answers. One approach to evaluation is human trials, but it can be prohibitively slow and expensive, especially for benchmarks. As an alternative, OpenEQA use an LLM to evaluate the correctness of open-vocabulary answers produced by EQA agents.

![alt text](assets/4-1.png)

## Citation

```
@inproceedings{OpenEQA2023,
        title = {OpenEQA: Embodied Question Answering in the Era of Foundation Models},
        booktitle = {Conference on Computer Vision and Pattern Recognition (CVPR)},
        author = {Majumdar, Arjun and Ajay, Anurag and Zhang, Xiaohan and Putta, Pranav and Yenamandra, Sriram and Henaff, Mikael and Silwal, Sneha and Mcvay, Paul and Maksymets, Oleksandr and Arnaud, Sergio and Yadav, Karmesh and Li, Qiyang and Newman, Ben and Sharma, Mohit and Berges, Vincent and Zhang, Shiqi and Agrawal, Pulkit and Bisk, Yonatan and Batra, Dhruv and Kalakrishnan, Mrinal and Meier, Franziska and Paxton, Chris and Sax, Sasha and Rajeswaran, Aravind},
        year = {2024},
    }
```
