# Embodied Arena Leaderboard Rules

The Embodied Arena leaderboards encompass benchmarks with wide influence in the field of embodied intelligence and evaluate influential models and academic frontier models, forming a comprehensive ranking of general large models and Embodied AI models.

## Benchmark Source
- Influential Academic Benchmarks:
  - Embodied Question Answering Benchmarks:
    - OpenEQA, VSI-Bench, ScanQA (3D), etc.
  - Embodied Navigation Benchmarks:
    - EB-Navigation, R2R, RxR etc.
  - Embodied Task Planning Benchmarks:
    - ET-Plan-Bench, EB-Habitat, EB-ALFRED, etc.
## Model Type
- Influential Models
  - GPT-4o, Gemini-2.5-Pro, Claude-3.7-Sonnet, Qwen-VL-Max, LLaVA-OneVision, InternVL3, VILA-1.5, etc.
- Academic Frontier Models
  - RoboBrain, EmbodiedGPT, etc.
- Models Willing to Join
  - Please provide the weight link of Hugging Face or ModelScope.
  - Please provide the API URL link, and indicate the model version supporting the OpenAI protocol interface.
## Evaluation Metric
During the evaluation phase, we select the corresponding evaluation metric based on the characteristics of the benchmark itself, which generally include the following types:

- Embodied Question Answering
  - Accuracy Based on Exact Matching
    - VSI-Bench, Where2Place, ERQA, etc.
  - Accuracy Based on Fuzzy Matching 
  	- Rule-based Metric (e.g., CIDEr, BELU, MRA)
    	- RoboVQA, Scan2Cap, ScanQA, etc.
  	- LLM-based Metric
      - OpenEQA, UniEQA, etc.
- Embodied Navigation
  - Success Rate
    - EB-Navigation, R2R, RxR etc.
- Embodied Task Planning
  - Success Rate
    - EB-ALFRED, EB-Habitat, ET-Plan-Bench, etc.
## Update Frequency
- The Leaderboards are updated once a month, and a snapshot of the results is taken on the first working day of each month, as the leaderboards of the previous month.

- Each manufacturer is only allowed to submit an evaluation application once a month. After receiving the evaluation application, it is generally updated within 7 working days.
---

**Embodied Arena** - An open-source, comprehensive, and user-friendly evaluation system and platform for embodied AI models
