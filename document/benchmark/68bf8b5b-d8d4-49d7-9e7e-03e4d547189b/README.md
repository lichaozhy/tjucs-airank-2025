---
leaderboard: 1143b13b-2754-4660-9f79-d0d0dc1f273e
name: ET-Plan-Bench
description: >
  ET-PLAN-BENCH: EMBODIED TASK-LEVEL PLANNING BENCHMARK TOWARDS SPATIAL-TEMPORAL COGNITION WITH FOUNDATION MODELS
organization: Huawei Noah’s Ark Lab, Huawei Cloud
released:
  at:
    year: 2025
    month: 2
    date: null
repository: null
huggingface: null
website: null
default:
  property: TotalSR
capabilities:
  - Spatial Reference Planning
  - Temporal Reference Planning
properties:
  NaviLayoutMap:
    order: 1
    index: 0
    label: Navi +Layout Map
    unit: ''
  Navi:
    order: 2
    index: 1
    label: Navi
    unit: ''
  NaviRelation:
    order: 3
    index: 2
    label: Navi+ Relation
    unit: ''
  TotalSR:
    order: 0
    index: 3
    label: Total SR
    unit: ''
---

## Introduction

![alt text](assets/1-2.png)
The ET-Plan-Bench focuses on various aspects of spatial understanding, including relation constraints, object occlusion, and global layout maps, as well as temporal understanding, covering action dependencies and optimal moving paths for robots. It provides a detailed and thorough diagnostic assessment of existing foundation models.

## Data Statistics

![alt text](assets/1-1.png)

## Citation

```
@misc{zhang2025etplanbenchembodiedtasklevelplanning,
      title={ET-Plan-Bench: Embodied Task-level Planning Benchmark Towards Spatial-Temporal Cognition with Foundation Models},
      author={Lingfeng Zhang and Yuening Wang and Hongjian Gu and Atia Hamidizadeh and Zhanguang Zhang and Yuecheng Liu and Yutong Wang and David Gamaliel Arcos Bravo and Junyi Dong and Shunbo Zhou and Tongtong Cao and Xingyue Quan and Yuzheng Zhuang and Yingxue Zhang and Jianye Hao},
      year={2025},
      eprint={2410.14682},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2410.14682},
}
```
