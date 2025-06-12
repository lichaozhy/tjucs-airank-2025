---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: Scan2Cap
description: >
  Scan2Cap: Context-aware Dense Captioning in RGB-D Scans
organization: Technical University of Munich, Simon Fraser University
released:
  at:
    year: 2020
    month: 12
    date: 7
Github: https://github.com/daveredrum/Scan2Cap
Hugging face: null
Project: https://daveredrum.github.io/Scan2Cap/
default:
  property: Total
properties:
  CIDEr:
    order: 1
    index: 0
    label: CIDEr
    unit: null
  B4:
    order: 2
    index: 1
    label: B-4
    unit: null
  Total:
    order: 0
    index: 2
    label: Total Score
    unit: null
---

## Benchmark Introduction

![alt text](assets/1-1.png)

We introduce the task of dense captioning in 3D scans from commodity RGB-D sensors. As input, we assume a point cloud of a 3D scene; the expected output is the bounding boxes along with the descriptions for the underlying objects. To address the 3D object detection and description problems, we propose Scan2Cap, an end-to-end trained method, to detect objects in the input scene and describe them in natural language. We use an attention mechanism that generates descriptive tokens while referring to the related components in the local context. To reflect object relations (i.e. relative spatial relations) in the generated captions, we use a message passing graph module to facilitate learning object relation features. Our method can effectively localize and describe 3D objects in scenes from the ScanRefer dataset, outperforming 2D baseline methods by a significant margin (27.61% CiDEr@0.5IoUimprovement).
## Citation

```
@inproceedings{chen2021scan2cap,
  title={Scan2Cap: Context-aware Dense Captioning in RGB-D Scans},
  author={Chen, Zhenyu and Gholami, Ali and Nie{\ss}ner, Matthias and Chang, Angel X},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={3193--3203},
  year={2021}
}

```
