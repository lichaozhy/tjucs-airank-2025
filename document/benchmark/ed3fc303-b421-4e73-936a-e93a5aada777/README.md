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
Github: https://github.com/google-deepmind/robovqa/tree/main
Hugging face: null
Project: https://robovqa.github.io/
default:
  property: Total
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

## Benchmark Introduction

![alt text](assets/1-1.png)

We present a scalable, bottom-up and intrinsically diverse data collection scheme that can be used for high-level reasoning with long and medium horizons and that has 2.2x higher throughput compared to traditional narrow top-down step-by-step collection. We collect realistic data by performing any user requests within the entirety of 3 office buildings and using multiple robot and human embodiments. With this data, we show that models trained on all embodiments perform better than ones trained on the robot data only, even when evaluated solely on robot episodes. We find that for a fixed collection budget it is beneficial to take advantage of cheaper human collection along with robot collection. We release a large and highly diverse (29,520 unique instructions) dataset dubbed RoboVQA containing 829,502 (video, text) pairs for robotics-focused visual question answering. We also demonstrate how evaluating real robot experiments with an intervention mechanism enables performing tasks to completion, making it deployable with human oversight even if imperfect while also providing a single performance metric. We demonstrate a single video-conditioned model named RoboVQA-VideoCoCa trained on our dataset that is capable of performing a variety of grounded high-level reasoning tasks in broad realistic settings with a cognitive intervention rate 46% lower than the zero-shot state of the art visual language model (VLM) baseline and is able to guide real robots through long-horizon tasks. The performance gap with zero-shot state-of-the-art models indicates that a lot of grounded data remains to be collected for real-world deployment, emphasizing the critical need for scalable data collection approaches. Finally, we show that video VLMs significantly outperform single-image VLMs with an average error rate reduction of 19% across all VQA tasks.

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
