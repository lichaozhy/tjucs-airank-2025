---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: RoboVQA
description: >
  RoboVQA: Multimodal Long-Horizon Reasoning for Robotics
organization: Google DeepMind
released:
  at:
    year: 2023
    month: 11
    date: 1
repository: https://github.com/google-deepmind/robovqa/tree/main
huggingface: null
website: https://robovqa.github.io/
default:
  property: Total
capabilities:
  - Temporal Description
  - Affordance Prediction
  - Task Reasoning
  - Basic Planning
properties:
  BELU-1:
    order: 1
    index: 0
    label: BELU-1
    unit: null
  BELU-2:
    order: 2
    index: 1
    label: BELU-2
    unit: null
  BELU-3:
    order: 3
    index: 2
    label: BELU-3
    unit: null
  BELU-4:
    order: 4
    index: 3
    label: BELU-4
    unit: null
  Total:
    order: 0
    index: 4
    label: Total Score
    unit: null
---

## Introduction

![alt text](assets/1-1.png)

RoboVQA  consists of 238h (10 days) of (video, text) pairs coming from recordings of long-horizon instructions being performed by 3 different embodiments (robot, human, human with tool) in a same environment (3 corporate buildings).
## Citation

```
@misc{sermanet2023robovqamultimodallonghorizonreasoning,
      title={RoboVQA: Multimodal Long-Horizon Reasoning for Robotics},
      author={Pierre Sermanet and Tianli Ding and Jeffrey Zhao and Fei Xia and Debidatta Dwibedi and Keerthana Gopalakrishnan and Christine Chan and Gabriel Dulac-Arnold and Sharath Maddineni and Nikhil J Joshi and Pete Florence and Wei Han and Robert Baruch and Yao Lu and Suvir Mirchandani and Peng Xu and Pannag Sanketi and Karol Hausman and Izhak Shafran and Brian Ichter and Yuan Cao},
      year={2023},
      eprint={2311.00899},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2311.00899},
}
```
