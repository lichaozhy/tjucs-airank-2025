# Embodied Arena Leaderboard Rules

🏆 Embodied Arena integrates influential benchmarks and models in the field of embodied intelligence, establishing a comprehensive ranking system for general large models and embodied AI models based on their performance across core embodied tasks. The detailed specifications of Embodied Arena—encompassing benchmark selection, model integration, evaluation metrics, and update frequency—are elaborated as follows.

## 📚 Benchmark Source

Embodied Arena has currently integrated multiple academically influential benchmarks. We sincerely welcome various benchmark construction teams in this field to actively contribute their achievements and jointly participate in the co-construction and continuous optimization of the evaluation system.

- Influential Academic Benchmarks
  - Embodied Question Answering Benchmarks
    - OpenEQA, VSI-Bench, ScanQA (3D), etc.
  - Embodied Navigation Benchmarks
    - EB-Navigation, VLN-CE R2R, VLN-CE RxR etc.
  - Embodied Task Planning Benchmarks
    - ET-Plan-Bench, EB-Habitat, EB-ALFRED, etc.
- Benchmarks Willing to Join
- Please provide the benchmark link and relevant information in the [Contribute Benchmark](https://www.embodied-arena.com/#/googleform/2ncVcX8K6quaEc7TA?height=2029) of Embodied Arena.

## 🤖 Model Type

Embodied Arena has currently integrated a variety of influential general large models and embodied AI models. We sincerely welcome various model research teams in this field to actively contribute their achievements and jointly participate in the co-construction and continuous optimization of the evaluation system.

- General Large Models
  - GPT-4o, Gemini-2.5-Pro, Claude-3.7-Sonnet, Qwen-VL-Max, LLaVA-OneVision, InternVL3, VILA-1.5, etc.
- Embodied AI Models
  - RoboBrain, EmbodiedGPT, etc.
- Models Willing to Join
  - Please provide the weight link of Hugging Face or ModelScope, or the API URL, and relevant information in the [Contribute Model](https://www.embodied-arena.com/#/googleform/CLAcMUbvU7TsNeKD8?height=2157) of Embodied Arena.

## 📈 Evaluation Metric

Embodied Arena currently supports the following evaluation metrics based on the characteristics of three types of core embodied tasks:

- Embodied Question Answering
  - Accuracy Based on Exact Matching
    - VSI-Bench, Where2Place, ERQA, VABench-Point, MineAnyBuild, SQA3D, ScanQA.
  - Accuracy Based on Fuzzy Matching
    - Rule-based Metric (e.g., CIDEr, MRA)
      -Scan2Cap(CIDEr), ScanQA(CIDEr), VSI-Bench(MRA).
    - LLM-based Metric
      - OpenEQA, UniEQA, MineAnyBuild, RoboVQA.
  - Other
    - micro-F1 score
      - PhyBlock 
    - Acc@0.25
      - ScanRefer
    - F1@0.25
      - Multi3DRefer
- Embodied Navigation
  - Success Rate
    - EB-Navigation, R2R, RxR, HM3D, MP3D.
- Embodied Task Planning
  - Success Rate
    - EB-ALFRED, EB-Habitat, ET-Plan-Bench.

The scoring rules for the embodied capability leaderboards and the embodied task leaderboards are as follows:

- Embodied Task Leaderboards

  Given $N$ benchmarks, let there be a benchmark $B^n(n=1,2,\cdots, N)$ consisting of $M$ fine-grained original capability dimensions. For each capability dimension $m(m=1,2,\cdots, M)$, $k^n_m$ denotes the total number of questions in the $m$-th capability dimension, and $c^n_m$ is the number of questions answered correctly in the $m$-th capability dimension. Each question has a score in the interval $[0,1]$.

  - Score Calculation for a Single Benchmark

    - Capability Dimension Score $S^n_m$

      $S^n_m = \frac{c^n_m}{k^n_m}\times 100$, $c^n_m\in [0,k^n_m]$, $S^n_m\in [0,100]$.

    - Total Score of All Capability Dimensions $A^n_{total}$

      $A^n_{total} = \frac{1}{M}\sum_{m=1}^{M}S^n_m$.

  - Total Score Across $N$ Benchmarks

    $B_{total} = \frac{1}{N}\sum_{n=1}^{N}A^n_{total}$.

- Embodied Capability Leaderboards

  Given $N$ benchmarks, let there be a benchmark $B^n(n=1,2,\cdots, N)$ consisting of $M$ fine-grained original capability dimensions and $P$ core capabilities. For each fine-grained capability dimension $m(m=1,2,\cdots, M)$, $k^n_m$ denotes the total number of questions in the $m$-th capability dimension, and $c^n_m$ is the number of questions answered correctly in the $m$-th capability dimension. (Note: If the benchmark has multiple original capability dimensions mapped to the capability dimension, then $k^n_m$ is the sum of the number of questions in the multiple original capability dimensions.)

  Each question has a score in the interval $[0,1]$.

  - Score Calculation for a Single Benchmark

    - Fine-grained Capability Dimension Score $S^n_m$

      $S^n_m = \frac{c^n_m}{k^n_m}\times 100$, $c^n_m\in [0,k^n_m]$, $S^n_m\in [0,100]$.

    - Core Capability Dimension Score $C^n_p$ for Each Core Capability Dimension $p(p=1,2,\cdots,P)$

      $C^n_p = \frac{1}{N_p}\sum_{m=1}{N_p} S^n_m,$ where $N_p$ represents the number of fine-grained capability dimensions included in the core capability.

    - Total Score of All Capability Dimensions $A^n_{total}$

      $A^n_{total} = \frac{1}{m}\sum_{m=1}^{M}S^n_m$.

  - Total Score of $N$ Benchmarks on A Fine-grained Capability Dimension $m$

    $T^m_{total} = \frac{\sum_{n=1}^{N} c^n_m}{\sum_{n=1}^{N} k^n_m}\times 100$.

  - Total Score of $N$ Benchmarks for All Capability Dimensions $B_{total}$

    $B_{total} = \frac{1}{m}\sum_{i=1}^{m}T^m_{total}$.

## ⏰ Update Frequency

- The Leaderboards are updated every two weeks.
- Each manufacturer is only allowed to submit an evaluation application once a month. After receiving the evaluation application, it is generally updated within 7 working days.

---

🏆 **Embodied Arena** - A comprehensive, unified, and evolving evaluation system and platform for embodied AI models
