---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: Scan2Cap
code: scan-2-cap
description: >
  Scan2Cap: Context-aware Dense Captioning in RGB-D Scans
organization: Technical University of Munich, Simon Fraser University
released:
  at:
    year: 2020
    month: 12
    date: 7
repository: https://github.com/daveredrum/Scan2Cap
huggingface: null
website: https://daveredrum.github.io/Scan2Cap/
default:
  property: Total
capabilities:
  - Spatial Relationship
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
  PercentileRank:
    order: null
    index: 3
    label: PR
    unit: null
---

## Introduction

![alt text](assets/1-1.png)

Scan2Cap is a benchmark for dense captioning in 3D scans captured using commodity RGB-D sensors. It focuses on the task of generating natural language descriptions for multiple objects within a 3D scene, given as a point cloud. Each object is annotated with a 3D bounding box and an associated textual description, enabling the joint evaluation of object localization and language generation. The benchmark emphasizes detailed scene understanding by requiring models to capture both the geometric properties of objects and their contextual relationships. Built on the ScanRefer dataset, Scan2Cap provides a challenging testbed for evaluating multimodal models that combine 3D perception with language capabilities.

## Benchmark Characteristics

- **Task**: Introduces the novel task of dense captioning in 3D RGB-D scans. This involves jointly localizing and describing each object in a 3D scene.
- **Input**: Assumes a point cloud of a 3D scene, which includes geometry coordinates, RGB values, and normal vectors.
- **Output**: Expected output is bounding boxes for individual object instances along with their natural language descriptions.
- **Key Innovations**: Focuses on leveraging 3D information (like actual object size and location) for more accurate descriptions and explicitly models object relations via a graph module.

## Data Statistics

- **Dataset**: Uses the ScanRefer dataset.
  - **Number of Descriptions**: 51,583 descriptions.
  - **Number of Objects**: 11,046 objects.
  - **Number of Scenes**: 800 ScanNet scenes.

## Evaluation

| Evaluation Aspect           | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary Metrics**         | **Combined Metrics ($\tilde{m^{Q}}kIoU$)**: These jointly measure the quality of generated descriptions and detected bounding boxes. They combine standard image captioning metrics (CiDEr, BLEU-4, METEOR, ROUGE) with an Intersection-over-Union (IoU) score between predicted and ground truth bounding boxes. An IoU threshold of _k_ (e.g., 0.25 or 0.5) determines if a box is considered correct for the captioning score.                                                                                                                                      |
| **Object Detection Metric** | **Mean Average Precision (mAP)**: Thresholded by IoU.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Baselines & Comparisons** | **2D-based Captioning Methods**: Compares against approaches that operate on 2D renders of 3D scenes and then back-project to 3D (e.g., "2D-3D Proj.", "3D-2D Proj."). <br> **3D Retrieval-based Methods**: Compares against methods like "VoteNetRetr" that use features of 3D bounding boxes detected by VoteNet for description retrieval. <br> **Oracle (Ground Truth) Methods**: Evaluates upper limits of performance using ground truth (GT) object bounding boxes for description generation ("Oracle2Cap3D", "OracleRetr3D", "Oracle2Cap2D", "OracleRetr2D"). |
| **Ablation Studies**        | Investigates the effectiveness of different components and training strategies: <br> - Contribution of Context-aware Attention Captioning (CAC). <br> - Contribution of the Relational Graph (RG) module. <br> - Benefits of end-to-end fine-tuning the `VoteNet` backbone with the description generation objective compared to a fixed pre-trained `VoteNet`. <br> - Impact of different point cloud features (e.g., xyz, rgb, normal, multiview).                                                                                                                   |
| **Qualitative Analysis**    | Manual analysis of randomly selected descriptions generated by different methods (e.g., Oracle2Cap2D, Oracle2Cap3D, Scan2Cap) to assess accuracy of object categories, appearance attributes, and spatial relations. Visual examples are provided to compare bounding box predictions and description quality across methods.                                                                                                                                                                                                                                          |

## Citation

```
@inproceedings{chen2021scan2cap,
  title={Scan2Cap: Context-aware Dense Captioning in RGB-D Scans},
  author={Dave Zhenyu Chen and Ali Gholami and Matthias Nießner and Angel X. Chang},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={3193--3203},
  year={2021}
}

```
