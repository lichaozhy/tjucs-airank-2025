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
repository: https://github.com/wentaoyuan/RoboPoint
huggingface: null
website: https://robo-point.github.io/
default:
  property: Total
capabilities:
  - Affordance Prediction
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

## Benchmark Characteristics

- Manually annotated, challenging real-world benchmark.
- Features diverse and cluttered scenes.
- Includes relation types not present in the synthetic training data (for a subset of 30 examples, WHERE2PLACE (h)).

## Benchmark Statistics:

- Consists of 100 real-world images from homes and offices.


## Benchmark Evaluation

To minimize bias, one group labels each image with an instruction describing a vacant region relative to other entities. A different group labels masks according to the instruction. Accuracy is calculated as the percentage of predicted points within the ground truth target mask.

## Citation

```
@article{yuan2024robopoint,
  title={RoboPoint: A Vision-Language Model for Spatial Affordance Prediction for Robotics},
  author={Yuan, Wentao and Duan, Jiafei and Blukis, Valts and Pumacay, Wilbert and Krishna, Ranjay and Murali, Adithyavairavan and Mousavian, Arsalan and Fox, Dieter},
  journal={arXiv preprint arXiv:2406.10721},
  year={2024}
}

```
