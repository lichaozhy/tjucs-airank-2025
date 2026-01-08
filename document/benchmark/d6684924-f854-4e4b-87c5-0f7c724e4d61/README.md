---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: MSQA
code: msqa
description: >
  Multi-modal Situated Reasoning in 3D Scenes
organization: BIGAI
released:
  at:
    year: 2024
    month: 9
    date: 18
repository: https://github.com/MSR3D/MSR3D
huggingface: null
website: https://msr3d.github.io/
default:
  property: Total
capabilities:
  - Spatial Relationship
  - Affordance Prediction
  - Object Type
  - Object Count
  - Object Property
  - Object Navigation
  - General Knowledge
properties:
  Affordance:
    order: 1
    index: 0
    label: Affordance
    unit: null
  Attribute:
    order: 2
    index: 1
    label: Attribute
    unit: null
  Counting:
    order: 3
    index: 2
    label: Counting
    unit: null
  Description:
    order: 4
    index: 3
    label: Description
    unit: null
  Existence:
    order: 5
    index: 4
    label: Existence
    unit: null
  Navigation:
    order: 6
    index: 5
    label: Navigation
    unit: null
  ObjectRefer:
    order: 7
    index: 6
    label: Object Refer
    unit: null
  RoomType:
    order: 8
    index: 7
    label: Room Type
    unit: null
  SpatialRelationship:
    order: 9
    index: 8
    label: Spatial Relationship
    unit: null
  Total:
    order: 0
    index: 9
    label: Total Score
    unit: null
  PercentileRank:
    order: null
    index: 10
    label: PR
    unit: null
---

## Introduction

![MSQA.png](assets/1-1.png)

Multi-modal Situated Question Answering (MSQA) is a large-scale multi-modal situated reasoning dataset, scalably collected leveraging 3D scene graphs and vision-language models (VLMs) across a diverse range of real-world 3D scenes. MSQA includes 251K situated question-answering pairs across 9 distinct question categories, covering complex scenarios within 3D scenes. We introduce a novel interleaved multi-modal input setting in our benchmark to provide both texts, images, and point clouds for situation and question description, aiming to resolve ambiguity in describing situations with single-modality inputs (e.g., texts).

## Benchmark Characteristics

- **Purpose**: MSQA accepts 3D point cloud, text-image interleaved situation, location and orientation and question as multi-modal input. It comprehensively evaluates the fine-graned and layout understanding capabilities of MLLMs.
- **Quality**: The benchmark is high-quality, having undergone human review to guarantee the quality of questions and correct incorrect annotations from the source datasets.

## Data Statistics

- **Data Source**: MSQA includes 251K situated question-answering pairs across 9 distinct question categories, covering complex scenarios within 3D scenes. The dataset sources from ScanNet, 3RScan and ARKitScenes.

![Question distribution](assets/1-2.png)

## Evaluation

MSQA evaluates performance using GPT-Score: we propose a robust evaluation pipeline based on LLMs (such as GPT-4o). The scoring mechanism overcomes the limitations of traditional metrics such as exact-match, and other n-gram metrics, closely aligning with human preference.

## Citation

```
@article{linghu2024multi,
  title={Multi-modal Situated Reasoning in 3D Scenes},
  author={Linghu, Xiongkun and Huang, Jiangyong and Niu, Xuesong and Ma, Xiaojian and Jia, Baoxiong and Huang, Siyuan},
  journal={Advances in Neural Information Processing Systems},
  year={2024}
}
```
