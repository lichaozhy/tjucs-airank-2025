---
leaderboard: 09b4a56a-2e41-4103-a330-129381c24450
name: Cosmos
code: cosmos
description: >
  Cosmos: An embodied reasoning evaluation benchmark which encompasses various tasks across the domains of robotics and embodied AI.
organization: NVIDIA
released:
  at:
    year: 2025
    month: 5
    date: 19
repository: https://github.com/nvidia-cosmos/cosmos-reason1
huggingface: https://huggingface.co/collections/nvidia/cosmos-reason1
website: null
default:
  property: Total
capabilities:
  - Task Reasoning
  - Basic Planning
  - Visual Reference Planning
  - Spatial Reference Planning
properties:
  TaskReasoning:
    order: 1
    index: 0
    label: Task Reasoning
    unit: null
  BasicPlanning:
    order: 2
    index: 1
    label: Basic Planning
    unit: null
  VisualReferencePlanning:
    order: 3
    index: 2
    label: Visual Reference Planning
    unit: null
  SpatialReferencePlanning:
    order: 4
    index: 3
    label: Spatial Reference Planning
    unit: null
  Total:
    order: 0
    index: 4
    label: Total Score
    unit: null
  PercentileRank:
    order: null
    index: 5
    label: PR
    unit: null
---

## Introduction

Cosmos Embodied Reasoning Benchmark is a vital component of the NVIDIA Cosmos Physical AI ecosystem, specifically designed to evaluate the capability of multimodal models to assist agents in perception, reasoning, and decision-making through the observation of embodied task videos. Distinguishing itself from traditional video captioning, this benchmark places a primary emphasis on action-oriented reasoning, requiring models to demonstrate a deep understanding of physical constraints, object affordances, and the underlying objectives of the agent. The evaluation suite comprises five diverse subtasks—BridgeV2, RoboVQA, AgibotWorld, HoloAssist, and RoboFail—totaling 510 meticulously curated and manually designed question-answer pairs that challenge a model's ability to ground its reasoning in the physical world.

## Benchmark characteristics

- **Unified Question Templates**: By adopting a standardized question format, the benchmark ensures that reasoning is conditioned on visual input rather than textual cues, effectively reducing ambiguity across diverse datasets.
- **Hierarchical Action Granularity**: Tasks are structured using a hierarchy of atomic-level "Actions," coarse-grained "Subtasks," and dataset-specific "Goals." This approach addresses the inherent uncertainty in predicting next steps by aligning the expected level of detail.
- **High Dependency on Visual Context**: Through rigorous manual refinement, samples that could be inferred solely from textual hints or the first frame of a video have been removed. This forces models to observe and reason over the entire video sequence to arrive at the correct answer.
- **Inclusion of Failure Diagnosis**: Via the specialized RoboFail subset, the benchmark evaluates a model's deep understanding of why a robot failed under complex physical constraints—a challenging area where most current state-of-the-art models (such as GPT-4o and Qwen2-VL) still struggle.

## Data Statistics

| Subtasks    | Introduction                                 | Sample Count |
| ----------- | -------------------------------------------- | ------------ |
| BridgeV2    | Robot operation task, predicting next action | 100          |
| RoboVQA     | Robot visual QA                              | 110          |
| AgibotWorld | Industrial robot tasks                       | 100          |
| HoloAssist  | First-person human demonstration             | 100          |
| RoboFail    | Robot failure detection                      | 100          |

| Capability                 | Source                  | Sample Count |
| -------------------------- | ----------------------- | ------------ |
| Task Reasoning             | RoboFail, RoboVQA       | 210          |
| Basic Planning             | HoloAssist, AgibotWorld | 123          |
| Visual Reference Planning  | AgibotWorld             | 39           |
| Spatial Reference Planning | BridgeV2, AgibotWorld   | 138          |



## Evaluation

- **Evaluation data**: Each sample is presented as a multiple-choice question (MCQ) with a set of options (e.g., A, B, C, D). This format ensures an objective comparison by requiring models to select a single correct answer based on the provided video and task context.
- **Evaluation metrics**: This work uses Accuracy as the primary metric. It calculates the percentage of correct predictions for each of the five subtasks—BridgeV2, RoboVQA, AgibotWorld, HoloAssist, and RoboFail—as well as the Overall Accuracy across all 510 benchmark samples.
- **Evaluation method**: The evaluation process involves extracting the predicted letter from the model's response (which typically contains a <think> reasoning trace followed by an <answer> tag, or only contains plain text with single letter answer (A-Z)). By comparing the parsed choice against the manually verified ground truth, the platform achieves an efficient, scalable, and unbiased scoring process.

## Citation

```
@article{cosmos-reason1,
  title={Cosmos-Reason1: From Physical Common Sense To Embodied Reasoning},
  author={NVIDIA Research},
  journal={arXiv preprint arXiv:2503.15558},
  year={2025}
}
```
