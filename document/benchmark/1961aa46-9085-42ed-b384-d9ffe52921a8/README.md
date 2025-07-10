---
leaderboard: 1143b13b-2754-4660-9f79-d0d0dc1f273e
name: EB-ALFRED
description: >
  EmbodiedBench: Comprehensive Benchmarking Multi-modal Large Language Models for Vision-Driven Embodied Agents
organization: University of Illinois Urbana-Champaign, Northwestern University, University of Toronto, Toyota Technological Institute at Chicago
released:
  at:
    year: 2025
    month: 2
    date: null
repository: https://github.com/EmbodiedBench/EmbodiedBench
huggingface: null
website: https://embodiedbench.github.io/
default:
  property: TotalSR
capabilities:
  - Basic Planning
  - Visual Reference Planning
  - Spatial Reference Planning
  - Knowledge Reference Planning
properties:
  BaseCapability:
    order: 1
    index: 0
    label: Base Capability
    unit: null
  CommonSense:
    order: 2
    index: 1
    label: Common Sense
    unit: null
  ComplexInstruction:
    order: 3
    index: 2
    label: Complex Instruction
    unit: null
  VisualAppearance:
    order: 4
    index: 3
    label: Visual Appearance
    unit: null
  SpatialAwareness:
    order: 5
    index: 4
    label: Spatial Awareness
    unit: null
  LongHorizon:
    order: 6
    index: 5
    label: Long Horizon
    unit: null
  TotalSR:
    order: 0
    index: 6
    label: Total SR
    unit: null
---

## Introduction

![alt text](assets/1-1.png)

EB-ALFRED is a high-level embodied planning benchmark introduced in EmbodiedBench, built on top of the ALFRED dataset and AI2-THOR simulator. Unlike traditional embodied settings that require pixel-level control, EB-ALFRED abstracts away low-level actions and focuses solely on symbolic high-level planning with language and vision input.

### Key features:

- **8 parameterized skills**: pick up, open, close, turn on, turn off, slice, put down, find. These are invoked with specific object arguments, e.g., "find an apple".

- **Multi-instance object indexing**: All interactable objects are suffixed (e.g., cabinet 2) to enable full task coverage from ALFRED, including multi-object tasks.

- **Dynamic action space**: Varies by scene (typically 171–298 actions). All put down variants are unified into one.

- **Egocentric RGB input + textual feedback**: Agents receive visual observations and descriptive text after each action.

- **Symbolic success evaluation**: Based on PDDL-defined subgoals rather than pixel matching.

- **Robust stopping criteria**: Episodes end after 30 environment steps, more than 10 invalid actions, or if the model halts planning.
## Benchmark characteristics
EB-ALFRED is designed to evaluate the high-level reasoning and planning ability of MLLMs in embodied environments. It exhibits several important characteristics that distinguish it from traditional embodied or vision-language tasks:

- High-Level Abstraction: Removes all low-level navigation and manipulation, focusing only on symbolic, skill-level planning grounded in vision and language.

- Multi-Instance Object Handling: Supports multiple identical object instances (e.g., cup 1, cup 2), which is critical for realistic household tasks.

- Dynamic Action Space: The number of available actions varies per scene (171–298), depending on the number of visible and interactable objects.

- Language-Vision Feedback Loop: The model observes the world through egocentric RGB images and textual feedback about the last action’s success or failure.

- PDDL-based Goal Checking: Task success is determined by symbolic state checks, not image comparison—enabling precise evaluation.

- Subset Decomposition: Tasks are categorized into six subsets (Base, Common-Sense, Spatial, Appearance, Long-Horizon, etc.), enabling granular capability analysis.

- Realistic and Diverse: Built upon real ALFRED task templates and environments rendered in AI2-THOR, ensuring naturalistic diversity and complexity.


## Data Statistics
300 tasks sampled from ALFRED's valid_seen scenes.

- 6 evaluation subsets, each with 50 tasks:
  - Base
  - Common-Sense
  - Complex Instruction
  - Spatial Awareness
  - Visual Appearance
  - Long Horizon

- 8 high-level skills, grounded to objects per scene:
  - Action space range: 171–298, depending on the number of valid interactions.
  - Max steps per episode: 30
  - Early termination: Triggered by 10+ invalid actions.
## Evaluation
EB-ALFRED was used to evaluate 24 MLLMs (8 proprietary and 16 open-source) under the same settings (e.g., temperature = 0, vision resolution = 500×500).

### Highlights:

- Claude-3.7-Sonnet leads with 67.7% task success.

- GPT-4o follows with 56.3%.

- InternVL3-78B is the best open-source model with 39.0% success.

- Clear scaling trend among open-source models as parameter size increases.

### Insights:

- Long-Horizon tasks are the most challenging for all models.

- Vision ablation has little impact on high-level task success, suggesting models rely more on language and symbolic feedback.

- Error analysis (e.g., GPT-4o):
  - 55% planning errors (e.g., skipped or repeated steps)
  - 41% reasoning errors
  - 4% perception errors

## Citation

```
@article{yang2025embodiedbench,
  title={EmbodiedBench: Comprehensive Benchmarking Multi-modal Large Language Models for Vision-Driven Embodied Agents},
  author={Yang, Rui and Chen, Hanyang and Zhang, Junyu and Zhao, Mark and Qian, Cheng and Wang, Kangrui and Wang, Qineng and Koripella, Teja Venkat and Movahedi, Marziyeh and Li, Manling and others},
  journal={arXiv preprint arXiv:2502.09560},
  year={2025}
}

```
