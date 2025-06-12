---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: ScanQA
description: >
  ScanQA: 3D Question Answering for Spatial Scene Understanding
organization: Kyoto University, ATR, RIKEN AIP, etc
released:
  at:
    year: 2022
    month: 5
    date: 1
Github: https://github.com/ATR-DBI/ScanQA
Hugging face: null
Project: null
default:
  property: Total
properties:
  CIDEr:
    order: 1
    index: 0
    label: CIDEr
    unit: null
  EM:
    order: 2
    index: 1
    label: EM
    unit: null
  Total:
    order: 0
    index: 2
    label: Total Score
    unit: null
---

## Benchmark Introduction

![alt text](assets/1-1.png)

We propose a new 3D spatial understanding task for 3D question answering (3D-QA). In the 3D-QA task, models receive visual information from the entire 3D scene of a rich RGB-D indoor scan and answer given textual questions about the 3D scene. Unlike the 2D-question answering of visual question answering, the conventional 2D-QA models suffer from problems with spatial understanding of object alignment and directions and fail in object localization from the textual questions in 3D-QA. We propose a baseline model for 3D-QA, called the ScanQA model, which learns a fused descriptor from 3D object proposals and encoded sentence embeddings. This learned descriptor correlates language expressions with the underlying geometric features of the 3D scan and facilitates the regression of 3D bounding boxes to determine the described objects in textual questions. e collected human-edited question-answer pairs with free-form answers grounded in 3D objects in each 3D scene. Our new ScanQA dataset contains over 41k question-answer pairs from 800 indoor scenes obtained from the ScanNet dataset.

## Citation

```
@inproceedings{azuma_2022_CVPR,
  title={ScanQA: 3D Question Answering for Spatial Scene Understanding},
  author={Azuma, Daichi and Miyanishi, Taiki and Kurita, Shuhei and Kawanabe, Motoaki},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2022}
}

```
