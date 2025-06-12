---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: Where2Place
description: >
  RoboPoint: A Vision-Language Model for Spatial Affordance Prediction for Robotics
organization: University of Washington
released:
  at:
    year: 2024
    month: 10
    date: 4
Github: https://github.com/wentaoyuan/RoboPoint
Hugging face: null
Project: https://robo-point.github.io/
default:
  property: Total
properties:
  Total:
    order: 0
    index: 0
    label: Total Score
    unit: null
---

## Benchmark Introduction

![alt text](assets/1-1.png)

Where2Place, a benchmark for spatial free-space reference on challenging real world images This dataset contains 100 real-world images to evaluate free space reference using spatial relations. The images are collected from various cluttered environments. Each image is labeled with a sentence describing the desired some free space and a mask of the desired region.

## Benchmark Evaluation

To evaluate on Where2Place, you should first run the command in RoboPoint to generate results, and then compute the accuracy.

## Citation

```
@article{yuan2024robopoint,
  title={RoboPoint: A Vision-Language Model for Spatial Affordance Prediction for Robotics},
  author={Yuan, Wentao and Duan, Jiafei and Blukis, Valts and Pumacay, Wilbert and Krishna, Ranjay and Murali, Adithyavairavan and Mousavian, Arsalan and Fox, Dieter},
  journal={arXiv preprint arXiv:2406.10721},
  year={2024}
}

```
