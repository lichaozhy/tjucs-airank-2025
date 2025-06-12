---
id: ba0be521-6b10-4881-964c-97cd4d2d6070
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: OpenEQA
description: >
  UniEQA & UniEval: A Unified Benchmark and Evaluation Platform for Multimodal Foundation Models in Embodied Question Answering
organization: Tianjin University
released:
  at:
    year: 2025
    month: 5
    date: null
Github: https://github.com/TJURL-Lab/UniEQA
Hugging face: https://huggingface.co/datasets/TJURL-Lab/UniEQA
Project: null
default:
  property: Total
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
  SpatialPerception:
    order: 6
    index: 5
    label: Spatial Perception
    unit: null
  Total:
    order: 0
    index: 6
    label: Total Score
    unit: null
---

## Benchmark Introduction

![alt text](assets/2-1.png)

In this work, we propose UniEQA, a new unified evaluation benchmark for EAI, designed to evaluate MFMs in terms of 5 core capabilities with 12 detailed dimensions.

## Benchmark characteristics

- **Broad Coverage of Capabilities**: It encompasses 5 core capabilities – object understanding, spatiotemporal perception, embodied knowledge, embodied reasoning, and task planning – and achieves a hierarchical and detailed evaluation from basic cognition to advanced cognitive abilities.
- **High Data Quality**: It covers 7 data sources, including both simulation and real-world data. It integrates 5 high-quality, multi-modal evaluation datasets in the embodied AI domain and includes 1 newly annotated evaluation dataset, providing a total of over 5000 Q&A Pairs.
- **Rich Data Types**: It covers multiple data types, including single images, multiple images, videos, and text, as well as 6 types of question-answering instructions such as multiple-choice and sorting.
- **Flexible Extensibility**: It supports flexible and convenient addition of evaluation datasets.
- **Automated Evaluation**: It constructs corresponding scoring rules and a unified automated evaluation method for different capability dimensions.

## Benchmark Statistics

- Data Collection: simulation (VirtualHome, BEHAVIOR-100, AI2-THOR)

  ![real-world (Ego4D, LEMMA, HM3D, and ScanNet)](assets/4-1.png)

## Benchmark Evaluation

![alt text](assets/5-1.png)

In this work, we propose a novel LLM-based evaluation method to improve the efficiency of the evaluation process.

- Evaluation data: we compare only two candidate answers to minimize LLM bias and try to make LLM make more objective decisions based on the semantics and logic of the candidate answers.
- Evaluation rule: we customize rule prompts for each capability dimension for more reasonable and accurate evaluation.
- Evaluation results: we use the high-performance, low-overhead GPT-4o-mini as the LLM of evaluation. To avoid accidental errors, we independently evaluate each Q&A pair three times and then take the average as the final evaluation result.

## Citation

```
@article{UniEQA2025,
  title={UniEQA & UniEval: A Unified Benchmark and Evaluation Platform fo  Multimodal Foundation Models in Embodied Question Answering},
  year={2025}
}
```
