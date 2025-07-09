# Embodied Arena Leaderboard Rules

Embodied Arena encompasses benchmarks and models with broad influence in the field of embodied intelligence, forming a comprehensive ranking of general large models and embodied AI models on core embodied tasks. The specific rules of Embodied Arena regarding benchmarks, models, evaluation metrics, and update frequency are explained below.

## Benchmark Source
Embodied Arena currently supports the evaluation of influential academic benchmarks and benchmarks that are willing to join this arena:
- Influential Academic Benchmarks
  - Embodied Question Answering Benchmarks
    - OpenEQA, VSI-Bench, ScanQA (3D), etc.
  - Embodied Navigation Benchmarks
    - EB-Navigation, VLN-CE R2R, VLN-CE RxR etc.
  - Embodied Task Planning Benchmarks
    - ET-Plan-Bench, EB-Habitat, EB-ALFRED, etc.
- Benchmarks Willing to Join
  - Please provide the benchmark link and relevant information in the Contribute Benchmark of Embodied Arena.
## Model Type
Embodied Arena currently supports the evaluation of general large models, embodied AI models, and models that are willing to join this arena:
- General Large Models
  - GPT-4o, Gemini-2.5-Pro, Claude-3.7-Sonnet, Qwen-VL-Max, LLaVA-OneVision, InternVL3, VILA-1.5, etc.
- Embodied AI Models
  - RoboBrain, EmbodiedGPT, etc.
- Models Willing to Join
	- Please provide the weight link of Hugging Face or ModelScope, or the API URL, and relevant information in the Contribute Model of Embodied Arena.
## Evaluation Metric
Embodied Arena currently supports the following evaluation metrics based on the characteristics of three types of core embodied tasks:
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
