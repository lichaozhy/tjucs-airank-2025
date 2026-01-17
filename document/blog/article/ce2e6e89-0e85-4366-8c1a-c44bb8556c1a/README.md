---
title: MSQA Benchmark Evaluation Report—The Main Challenges of Structured 3D Contextual Question Answering Lie in Object Localization and Counting
code: MSQA
abstract: MSQA (Multi-modal Situated Question Answering), published in NeurIPS 2024 Datasets & Benchmarks Track, is a benchmark with the paper titled "Multi-modal Situated Reasoning in 3D Scenes," jointly proposed by the Beijing Institute for General Artificial Intelligence (BIGAI) and Peking University. It is a large-scale, reproducible benchmark for 3D contextual question answering that uses structured scene information to replace purely visual input, systematically testing the spatial reasoning capability of models.
at: 2026-1-16
---

## **MSQA Benchmark Evaluation Report—The Main Challenges of Structured 3D Contextual Question Answering Lie in Object Localization and Counting**

## **1. Introduction to the Benchmark**

### **1.1 Source**

MSQA (Multi-modal Situated Question Answering), published in NeurIPS 2024 Datasets & Benchmarks Track, is a benchmark with the paper titled "Multi-modal Situated Reasoning in 3D Scenes," jointly proposed by the Beijing Institute for General Artificial Intelligence (BIGAI) and Peking University. It is a large-scale, reproducible benchmark for 3D contextual question answering that uses structured scene information to replace purely visual input, systematically testing the spatial reasoning capability of models.

- Project Homepage: msr3d.github.io

- Paper: arxiv.org/abs/2409.02389

- Leaderboard: embodied-arena.com

### **1.2 Dataset Overview**

MSQA contains approximately **251K** contextual question-answering samples, covering **9 task categories**. This test was conducted on 1404 samples, with the task types distributed as follows:

- **Spatial Relationship**: 287 items, covering the capability to analyze the relative positional relationships and spatial layout between objects.

- **Counting**: 254 items, covering the accurate counting of specific types or objects that meet certain conditions in a scene.

- **Navigation**: 226 items, covering the capability to perform path planning and direction guidance based on spatial understanding.

- **Existence**: 193 questions, covering the capability to determine whether a specific object exists in a specified location or direction.

- **Attribute**: 175 questions, covering the identification and description of an object's physical attributes (color, material, shape, state, etc.).

- **Refer**: 102 questions, covering the capability to understand and interpret spatial references.

- **Affordance**: 85 questions, covering the reasoning capability to understand the function, purpose, and interaction possibilities of an object.

- **Description**: 49 questions, covering the capability to provide detailed descriptions and summaries of scenes or objects.

- **Room Type**: 33 questions, covering the capability to identify and classify different spatial environment types.

Nine task categories can be mapped to four capabilities:

- **Object Perception**: Counting, Existence, Attribute, Refer, Description

- **Spatial Perception**: Spatial Relationship, Room Type

- **Embodied Knowledge**: Affordance

- **Embodied Navigation**: Navigation

Each sample in the dataset contains: a multimodal context description (text/image/point cloud), 3D scene information (scene graph or point cloud representation), and a corresponding question-answer. The core objective is to evaluate the model's reasoning capability under "concrete context + 3D scene constraints".

Below is an example QA for an existence question.

- **Question**:

  - **Robot Information**:

	  - Located in a 3D kitchen scene, coordinates [-2.377, 1.276, 0.0]
	
	  - Orientation angle is 1.726 (facing a specific direction)
	
	  - Current status: Emptying the trash can

  - **Scene Structured Text Representation**:

	  - Yoga mat: Located at [-2.882, 1.72, 0.677], green, cylindrical, foam material
	
	  - Other items: Kitchen island, chairs, books, trash can, etc., totaling dozens of objects

  - **Test Question**: Can I find a [yoga mat image] in front of me?

- **Standard Answer**: "no"

### **1.3 Evaluation Metrics**

Since the answers are open-ended text, this evaluation uses fuzzy matching and LLM scoring. The model scores each answer from 1 to 5 points, then maps them to a percentage (out of 100).

## **2. Evaluation Overview**

### **2.1 Evaluation Settings**

This evaluation uses **structured text input**: the 3D scene is serialized into text, including object categories, 3D coordinates, bounding box size, and agent position and orientation; some objects are accompanied by supplementary images.

Compared to pure visual VQA or pure point cloud tasks, this setting has less ambiguity but requires a higher level of **capability to utilize structured information**.

### **2.2 Overall Ranking**

This evaluation assesses **24 models** on **1404 samples**, with **claude_3_7_sonnet** ranking first (60.43%).

**Top-3 Models**

| Rank | Model             | Total  |
|------|-------------------|--------|
| 1.   | Claude-3.7-Sonnet | 60.43% |
| 2.   | o4-mini           | 60.32% |
| 3.   | Gemini-2.5-Pro    | 57.77% |


### **2.3 Group Comparison**

The 24 models are divided into three groups based on their source:

| **Group**                     | **Number** | **Mean**  | **Range** | **SOTA**                     |
|-------------------------------|------------|-----------|-----------|------------------------------|
| Closed-Source General Knowledge | 7          | 57.29%    | 34–60%    | Claude-3.7-Sonnet (60.43%)   |
| Embodied Models               | 7          | 35.86%    | 21–54%    | RoboBrain 2.0-32B (54.02%)   |
| Open Source General Knowledge         | 10         | 24.95%    | 0–45%     | Qwen 2.5-VL-3B (45.5%)       |


**Trend Interpretation**: Closed-Source General Knowledge shows a clear advantage in semantic terms; embodied models have an upper limit close to the top of closed-source models, but with greater variance; Open Source General Knowledge is generally weak, indicating that "structured 3D scenes + format constraints" remain a significant hurdle for open-source models.

### **2.4 Difficulty Distribution**

The difficulty of the 9 tasks is measured by the overall model mean (lower values ​​indicate greater difficulty):

| **Difficulty**       | **Category**          | **Mean**  |
|----------------------|-----------------------|-----------|
| 🔴 Most Difficult    | Counting              | 16.52%    |
| 🔴                   | Refer                 | 25.06%    |
| 🟠                   | Spatial Relationship  | 35.49%    |
| 🟠                   | Navigation            | 37.85%    |
| 🟠                   | Description           | 41.86%    |
| 🟠                   | Attribute             | 42.34%    |
| 🟠                   | Existence             | 43.04%    |
| 🟢                   | Affordance            | 57.91%    |
| 🟢 Relatively Easy   | Room Type             | 64.04%    |


**Conclusion:** The main challenges lie in tasks related to Couting and Spatial Relationships, while general knowledge tasks are relatively easier.

The optimal models for each task are as follows:

| **Category**          | **Optimal Model**       | **Score** |
|-----------------------|-------------------------|-----------|
| Counting              | Claude-3.7-Sonnet       | 39.25%    |
| Refer                 | Claude-3.7-Sonnet       | 57.07%    |
| Spatial Relationship  | o4-mini                 | 57.85%    |
| Navigation            | o4-mini                 | 68.12%    |
| Description           | Claude-3.7-Sonnet       | 82.78%    |
| Attribute             | RoboBrain2.0-32B        | 77.50%    |
| Existence             | Claude-3.7-Sonnet       | 76.51%    |
| Affordance            | RoboBrain2.0-32B        | 91.88%    |
| Room Type             | Cosmos-Reason-1-7B      | 94.17%    |
 

## **3. Analysis**

### **3.1 Benchmark Validity**

- **Good Discrimination**: Significant differences between the top and bottom models, effectively differentiating them.

- **Sufficient Scale**: 251K samples, 9 task categories, statistically stable; however, automated construction may introduce templates and noise, fine-grained attribution requires sampling verification.

### **3.2 Coverage and Limitations**

- **Difficulty in Spatial Binding**: Counting is the most difficult, followed by Spatial relationship and Navigation; Affordance and Room Type are relatively easier. Bottlenecks are concentrated on "which to count / which to refer to / spatial relationships".

- **Limited to Offline QA**: Does not involve active exploration, long-term reasoning, and operational control, more suitable as a supplementary evaluation of "reasoning capability in a given context".

### **3.3 Performance Attribution**

- **Key to High Scores**: Stable utilization of scene text structure information + object images to match the correct object information.

- **Common Mistakes:** ① Incorrect or missed object identification, leading to errors; ② Unstable interpretation of spatial terms (left/right/front/back/nearest), affecting spatial relationships and navigation.

- **Improvement Directions:** Introduce a "locate first, then answer" process, calculating distance/direction as an intermediate conclusion; standardize the output format (unify yes/no and numerical formats).
