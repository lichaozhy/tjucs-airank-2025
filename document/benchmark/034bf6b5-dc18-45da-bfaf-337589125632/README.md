---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: UniEQA
description: >
  UniEQA & UniEval: A Unified Benchmark and Evaluation Platform for Multimodal Foundation Models in Embodied Question Answering
organization: Tianjin University
released:
  at:
    year: 2025
    month: 5
    date: null
repository: https://github.com/TJURL-Lab/UniEQA
huggingface: https://huggingface.co/datasets/TJURL-Lab/UniEQA
website: null
default:
  property: Total
capabilities:
  - Object Type
  - Object Property
  - Object State
  - Spatial Relationship
  - Temporal Description
  - Temporal Order
  - General Knowledge
  - Affordance Prediction
  - Temporal Reasoning
  - Task Reasoning
  - Location Navigation
properties:
  ObjectType:
    order: 1
    index: 0
    label: Object Type
    unit: null
  ObjectProperty:
    order: 2
    index: 1
    label: Object Property
    unit: null
  ObjectState:
    order: 3
    index: 2
    label: Object State
    unit: null
  SpatiaPerception:
    order: 4
    index: 3
    label: Spatia Perception
    unit: null
  ActionPerception:
    order: 5
    index: 4
    label: Action Perception
    unit: null
  TemporalPerception:
    order: 6
    index: 5
    label: Temporal Perception
    unit: null
  Affordance:
    order: 7
    index: 6
    label: Affordance
    unit: null
  WorldKnowledge:
    order: 8
    index: 7
    label: World Knowledge
    unit: null
  TaskRelatedObjectReasoning:
    order: 9
    index: 8
    label: Task Related Object Reasoning
    unit: null
  SituatedReasoning:
    order: 10
    index: 9
    label: Situated Reasoning
    unit: null
  ClosedLoopPlanning:
    order: 11
    index: 10
    label: Closed-Loop Planning
    unit: null
  OpenLoopPlanning:
    order: 12
    index: 11
    label: Open-Loop Planning
    unit: null
  Total:
    order: 0
    index: 12
    label: Total Score
    unit: null
---

## Introduction

![alt text](assets/2-1.png)

UniEQA, a new unified evaluation benchmark for embodied artificial intelligence, is designed to evaluate MLLMs in terms of 5 core capabilities with 12 detailed dimensions. The benchmark is established based on seven heterogeneous data sources, covering simulated and real-world scenarios. The benchmark contains a total of 5378 question-answer pairs, of which 4445 are completely different questions format. By integrating multiple existing EQA benchmarks with newly annotated datasets and performing manual review, UniEQA effectively ensures its reliability, comprehensiveness and diversity.
## Benchmark characteristics

- **Broad Coverage of Capabilities**: It encompasses 5 core capabilities – object understanding, spatiotemporal perception, embodied knowledge, embodied reasoning, and task planning – and achieves a hierarchical and detailed evaluation from basic cognition to advanced cognitive abilities.
- **High Data Quality**: It covers 7 data sources, including both simulation and real-world data. It integrates 5 high-quality, multi-modal evaluation datasets in the embodied AI domain and includes 1 newly annotated evaluation dataset, providing a total of over 5000 Q&A Pairs.
- **Rich Data Types**: It covers multiple data types, including single images, multiple images, videos, and text, as well as 6 types of question-answering instructions such as multiple-choice and sorting.
- **Flexible Extensibility**: It supports flexible and convenient addition of evaluation datasets.
- **Automated Evaluation**: It constructs corresponding scoring rules and a unified automated evaluation method for different capability dimensions.

## Data Statistics

- Data Collection: simulation (VirtualHome, BEHAVIOR-100, AI2-THOR)

  ![real-world (Ego4D, LEMMA, HM3D, and ScanNet)](assets/4-1.png)

## Evaluation

![alt text](assets/5-1.png)

This paper proposes a novel LLM-based evaluation method to improve the efficiency of the evaluation process.

- Evaluation data: This work compares only two candidate answers to minimize LLM bias and tries to make the LLM make more objective decisions based on the semantics and logic of the candidate answers.
- Evaluation rule: This work customizes rule prompts for each capability dimension for a more reasonable and accurate evaluation.
- Evaluation results: This work uses the high-performance, low-overhead GPT-4o-mini as the LLM of evaluation. To avoid accidental errors, it independently evaluates each Q&A pair three times and then takes the average as the final evaluation result.

## Citation

```
@article{UniEQA2025,
  title={UniEQA & UniEval: A Unified Benchmark and Evaluation Platform for  Multimodal Foundation Models in Embodied Question Answering},
  year={2025}
}
```
