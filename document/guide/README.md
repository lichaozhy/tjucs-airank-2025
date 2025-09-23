# Embodied Arena User Guide

## Platform Overview

**Embodied Arena** is an open-source, comprehensive, and user-friendly evaluation system and platform for embodied AI models. It features three types of core embodied tasks, a diverse range of high-quality benchmarks, LLM-driven automated evaluation data generation, and a systematic embodied capability taxonomy. The platform aims to present an up-to-date overview of embodied capabilities of advanced models and facilitate the identification of critical research areas, thereby accelerating progress in the field of Embodied AI.

---

## What Makes Embodied Arena Special?

### 🎯 **Comprehensive Evaluation System**

- **3 Types of Leaderboards**: Question Answering, Navigation, and Task Planning
- **22+ Evaluation Benchmarks**: Covering diverse embodied AI scenarios
- **30+ Advanced Models**: Including both general large models and specialized embodied AI models
- **20+ Institutes**: Representing leading research organizations worldwide

### 🔧 **Key Features**

#### 🧠 **Comprehensive Embodied Capability Taxonomy**

Systematic categorization spanning object perception, spatial reasoning, temporal understanding, embodied knowledge, navigation, and task planning across multiple dimensions. Embodied Arena uses a systematic taxonomy of embodied capability, carefully sifted and refined from diverse embodied tasks and benchmarks, providing concentrated metrics for reliable evaluation and essential objectives for research breakthrough.

- **7 Core Embodied Capabilities**
- **25 Fine-grained Dimensions**
- **Comprehensive Benchmark-Capability Mapping**

#### 🤖 **Rich Model Support**

Comprehensive evaluation support for diverse AI architectures including general multimodal LLMs, specialized embodied models, and both open-source and closed-source models. The platform offers flexibility and convenience for users to join with professional integration support.

- **30+ Advanced Models**: From 20+ leading research institutes worldwide
- **Multiple Model Types**: General LLMs, embodied multimodal models, and 3D vision models
- **Flexible Integration**: Support for model parameters, API-based evaluation, and various access methods

#### **🔧 Modular Benchmark Integration**

Comprehensive integration of diverse evaluation benchmarks including visual QA, navigation tasks, task planning, and both 2D/3D scenarios, with flexible extensibility for new benchmarks.

- **22+ Evaluation Benchmarks**: Covering diverse embodied AI scenarios
- **Multi-domain Coverage**: 2D visual reasoning, 3D interactive environments, and simulation-based testing
- **Extensible Architecture**: Easy onboarding for new benchmarks and evaluation tasks

#### ⚡ **Unified Evaluation Infrastructure**

Clean, standardized evaluation framework with uniform input/output formats enabling seamless and rapid distributed assessment across diverse embodied AI benchmarks.

- **Standardized Framework**: Consistent evaluation protocols across all benchmarks
- **Professional Management**: Detailed experiment tracking and transparent result presentation
- **Real-time Updates**: Monthly leaderboard updates with dynamic performance tracking

#### 🔄 **High-quality Evaluation Datasets**

Curated evaluation datasets with strong discriminative power across varying difficulty levels, continuously evolved through LLM-driven automated generation pipeline.

- **LLM-driven Generation**: Unique approach for embodied evaluation data creation
- **Diverse Difficulty**: Curated evaluation datasets across varying difficulty levels
- **Continuous Evolution**: Regular dataset updates ensuring relevance and challenge

#### 📊 **Diverse Evaluation Methodologies**

Complementary evaluation paradigms including accuracy-based QA assessment (exact and fuzzy matching evaluation) and interactive simulation-based testing (success rate metrics) for comprehensive embodied capability evaluation.

- **Multi-metric Assessment**: Exact matching, fuzzy matching (rule-based and LLM-based), and success rate evaluation
- **Comprehensive Coverage**: Question answering, navigation, and task planning evaluation
- **Transparent Results**: Open and accessible performance comparisons with detailed capability analysis

---

## Three Core Leaderboards

### 1. 🤔 **Embodied Question Answering Leaderboard**

**Purpose**: A dedicated ranking system for evaluating and comparing the performance of embodied AI models in question-answering tasks.

**Key Benchmarks**:

- **UniEQA**: Unified evaluation benchmark for embodied AI with 5 core capabilities across 12 dimensions
- **OpenEQA**: First open-vocabulary benchmark with LLM-powered evaluation protocol
- **VSI-Bench**: Visual-spatial intelligence evaluation from egocentric video with 5,000+ question-answer pairs
- **ERQA**: Embodied reasoning question answering with 400 multiple-choice VQA-style questions
- **SQA3D**: 3D scene understanding with 33.4k reasoning questions across 650 scenes
- **ScanQA**: 3D spatial understanding with 41k question-answer pairs from 800 indoor scenes
- **Scan2Cap**: Dense captioning in 3D scans with natural language descriptions and bounding boxes
- **ScanRefer**: 3D object localization using natural language descriptions in RGB-D scans with 51,583 expressions referring to 11,046 objects across 800 indoor scenes
- **Multi3DRefer**: Multi-object localization in 3D scenes with over 61,900 descriptions referencing more than 11,600 objects
- **PhyBlock**: Physical understanding assessment through robotic 3D block assembly tasks (2600 block tasks including 400 assembly tasks and 2200 VQA tasks)
- **MineAnyBuild**: Spatial planning abilities evaluation in Minecraft with 4,000 curated tasks from multi-modal instructions
- **RoboVQA**: Robot visual question answering with 829,502 video-text pairs for long-horizon reasoning
- **Where2Place**: Spatial free-space reference evaluation on 100 real-world images from cluttered environments
- **VABench-Point**: Spatial reasoning benchmark for precise spatial understanding

### 2. 🧭 **Embodied Navigation Leaderboard**

**Purpose**: A dedicated ranking system for evaluating and comparing the performance of embodied AI models in navigation tasks.

**Key Benchmarks**:

- **EB-Navigation**: Navigation-focused benchmark evaluating low-level perception and action prediction
- **VLN-CE R2R**: Room-to-Room navigation in continuous environments
- **VLN-CE RxR**: Multilingual navigation with both Guide and Follower trajectories
- **MP3D**: ObjectNav benchmark on Matterport3D dataset with 90+ buildings including homes, offices, and churches, evaluating object search strategies across complex layouts
- **HM3D**: Habitat-Matterport 3D dataset providing hundreds of high-resolution, richly annotated environments for more challenging ObjectNav scenarios

### 3. 📋 **Embodied Task Planning Leaderboard**

**Purpose**: A dedicated ranking system for evaluating and comparing the performance of embodied AI models in task planning.

**Key Benchmarks**:

- **ET-Plan-Bench**: Comprehensive assessment focusing on spatial understanding, temporal understanding, and robot planning
- **EB-ALFRED**: High-level embodied planning benchmark built on ALFRED dataset
- **EB-Habitat**: 3D embodied navigation benchmark for long-horizon goal-directed navigation

---

## Seven Core Capability Framework

### 🔍 **Object Perception**

Understanding and identifying objects in embodied environments through visual inputs.

**Dimensions**:

- **Object Type**: Object recognition capability that requires the model to identify specific category of the object based on visual inputs, such as 'table'
- **Object Property**: Object property recognition capability that requires the model to identify the properties of the object based on visual inputs, such as 'colour', 'shape', 'material', 'size'
- **Object State**: Object state recognition capability that requires the model to identify the state of the object based on visual inputs, such as 'open', 'closed', 'stationary'
- **Object Count**: Object count recognition capability that requires the model to identify the number of objects based on visual inputs, such as 'number of chairs'

**Supported Benchmarks**: PhyBlock, VSI-Bench, ERQA, RoboVQA, OpenEQA, EB-ALFRED, EB-Habitat

### 📐 **Spatial Perception**

Understanding spatial relationships and positioning in 3D environments through visual analysis.

**Dimensions**:

- **Spatial Relationship**: Spatial relationship perception capability that requires the model to make judgements on spatial relationships based on visual inputs, such as 'next to'
- **Spatial Distance**: Distance perception capability that requires the model to make judgements on relative or absolute distances based on visual inputs, such as 'closer', '3 metres'
- **Spatial Localization**: Location perception capability that requires the model to localize based on visual inputs, such as a 'bounding box'
- **Spatial Size**: Size perception capability that requires the model to make judgements on space size based on visual inputs, such as 'size of this room'

**Supported Benchmarks**: PhyBlock, VSI-Bench, ERQA, ScanQA, Scan2Cap, ScanRefer, Multi3DRefer, ET-Plan-Bench

### ⏰ **Temporal Perception**

Understanding temporal sequences and timing in embodied scenarios.

**Dimensions**:

- **Temporal Description**: Temporal understanding capability that requires the model to describe the visual input contents concerning the temporal dimension, such as action descriptions
- **Temporal Order**: Temporal order perception capability that requires the model to understand the timestamp and sequential order of events based on visual inputs

**Supported Benchmarks**: PhyBlock, VSI-Bench, ET-Plan-Bench

### 🧠 **Embodied Knowledge**

Applying general knowledge and affordance understanding in embodied contexts.

**Dimensions**:

- **General Knowledge**: General knowledge understanding capability that requires the model to make judgements on general knowledge based on visual inputs, such as refrigerators can keep food fresh
- **Affordance Prediction**: Affordance prediction capability that requires the model to predict the ways in which objects can be manipulated based on visual inputs

**Supported Benchmarks**: OpenEQA, EB-Navigation, EB-ALFRED, EB-Habitat

### 🎯 **Embodied Reasoning**

Advanced reasoning and inference capabilities in embodied scenarios.

**Dimensions**:

- **Object Reasoning**: Object reasoning capability that requires the model to reason feasible actions on objects, comparative results of object properties, based on object perception results
- **Spatial Reasoning**: Spatial reasoning capability that requires the model to reason object accessibility, spatial inclusiveness, spatial imagination, based on spatial perception results
- **Temporal Reasoning**: Temporal reasoning capability that requires the model to reason the causes and consequences based on temporal perception results
- **Knowledge Reasoning**: Knowledge reasoning capability that requires the model to reason physical dynamics based on prior knowledge and visual inputs
- **Task Reasoning**: Task reasoning capability that requires the model to reason the type and location of task-related objects, task progress, based on visual inputs and task instruction

**Supported Benchmarks**: PhyBlock, ERQA, RoboVQA, Scan2Cap

### 🧭 **Embodied Navigation**

Navigation capabilities in complex environments with different types of guidance.

**Dimensions**:

- **Object Navigation**: Navigation capability for tasks where the instruction requires navigation to specified objects
- **Location Navigation**: Navigation capability for tasks where the instruction requires navigation to a specified location
- **Instruction Navigation**: Navigation capability for tasks where the instruction specifies a navigation path

**Supported Benchmarks**: EB-Navigation, R2R-CE, RxR-CE, MP3D, HM3D

### 📋 **Embodied Task Planning**

Strategic planning and execution capabilities for complex embodied tasks.

**Dimensions**:

- **Base Planning**: Planning capability for tasks where the instruction specifies object types
- **Visual Reference Planning**: Planning capability for tasks where the instruction refers to objects using object properties, states
- **Spatial Reference Planning**: Planning capability for tasks with spatial constraints
- **Temporal Reference Planning**: Planning capability for tasks with temporal constraints
- **Knowledge Reference Planning**: Planning capability for tasks where the instruction refers to objects using object-related knowledge

**Supported Benchmarks**: VSI-Bench, ERQA, RoboVQA, EB-ALFRED, EB-Habitat, ET-Plan-Bench

---

## Supported Model Types

EmbodiedArena evaluates a comprehensive range of AI models, from general-purpose multimodal models to specialized embodied AI systems. Our platform supports both influential commercial models from leading companies and cutting-edge research models that represent the latest advances in embodied intelligence.

### 🌟 **General Multimodal Models**

Large-scale multimodal models with strong vision-language understanding capabilities, suitable for embodied question answering and high-level reasoning tasks.

- **OpenAI**: GPT-4o, GPT-4V, GPT-3.5-Turbo
- **Google DeepMind**: Gemini-2.0-Flash, Gemini-2.0-Pro, Gemini-2.5-Pro
- **Anthropic**: Claude-3.5-Sonnet, Claude-3.7-Sonnet
- **Alibaba Group**: Qwen-VL-Max, Qwen2.5-VL-3B-Ins, Qwen2.5-VL-7B-Ins, Qwen2.5-VL-72B-Ins
- **ByteDance**: Seed1.5-VL, LLaVA-OneVision
- **Shanghai AI Lab / Tsinghua**: InternVL3
- **NVIDIA**: VILA-1.5, Cosmos-reason

**Strengths**:

- Strong language understanding and reasoning capabilities
- Excellent vision-language integration
- Suitable for complex question answering and high-level task reasoning
- Robust performance across diverse embodied scenarios

### 🤖 **Specialized Embodied AI Models**

Models specifically designed and optimized for embodied AI tasks, featuring enhanced spatial understanding, navigation capabilities, and physical interaction reasoning.

#### **2D Embodied Models**

Specialized for 2D visual reasoning benchmarks and embodied question answering tasks.

- **BAAI**: Navid, UniNavid, RoboBrain
- **Shanghai AI Lab**: VeBrain, VLN-R1, StreamVLN
- **Tianjin University**: RoboAnnotatorX, Embodied-FSD, HuLE-Nav
- **University of Washington**: RoboPoint
- **Shanghai Jiao Tong University**: SpatialBot
- **The University of Hong Kong**: EmbodiedGPT
- **The Chinese University of Hong Kong**: navillm
- **Georgia Institute of Technology**: VLFM, Habitat-Web
- **Google DeepMind**: SpatialVLM
- **Peking University**: Space-R, VoroNav, InstructNav
- **Huawei Noah's Ark Lab**: SpatialCoT, Mem2Ego
- **NVIDIA**: Cosmos-reason
- **Beihang University**: Robo-Refer

**Applications**: VSI-Bench, ERQA, Where2Place, RoboVQA, and other 2D QA benchmarks

#### **3D Embodied Models**

Advanced models designed for 3D scene understanding and spatial reasoning tasks.

- **Shanghai AI Lab**: Grounded-3D-LLM, GPT4Scene
- **Beijing Jiaotong University / Peking University**: PhysVLM, UniNavid, Navid
- **The University of Hong Kong**: Video-3D LLM, LLaVA-3D, GPT4Scene
- **The Chinese University of Hong Kong**: Video-3D LLM
- **UMass Amherst**: 3D-Mem

**Applications**: ScanQA, SQA3D, Scan2Cap, ScanRefer, Multi3DRefer, and other 3D QA benchmarks

---

## How to Evaluate

Embodied Arena extensively supports comprehensive evaluation of models from different sources (open-source, closed-source) by different means (model parameters, API), offering flexibility and convenience for users to join. The platform leverages a diverse range of well-curated embodied AI benchmarks, ensuring high alignment with canonical evaluation methods and the best completeness compared to prior works.

### **Evaluation Metrics**

During the evaluation phase, we select the corresponding evaluation metric based on the characteristics of the benchmark itself, which generally include the following types:

#### **Embodied Question Answering**

- **Accuracy Based on Exact Matching**
  - Applied to benchmarks: VSI-Bench, Where2Place, ERQA, etc.
- **Accuracy Based on Fuzzy Matching**
  - **Rule-based Metric** (e.g., CIDEr, BLEU, MRA): RoboVQA, Scan2Cap, ScanQA, etc.
  - **LLM-based Metric**: OpenEQA, UniEQA, etc.

#### **Embodied Navigation**

- **Success Rate**
  - Applied to benchmarks: EB-Navigation, MP3D, HM3D, R2R-CE, RxR-CE, etc.
- **Path Length Weighted Success Rate (SPL)**
  - Evaluates navigation efficiency by considering both success and path optimality

#### **Embodied Task Planning**

- **Success Rate**
  - Applied to benchmarks: EB-ALFRED, EB-Habitat, ET-Plan-Bench, etc.

### **Update Frequency**

- **Monthly Updates**: The leaderboards are updated once a month, with a snapshot of results taken on the first working day of each month as the leaderboards of the previous month
- **Submission Policy**: Each manufacturer is only allowed to submit an evaluation application once a month
- **Processing Time**: After receiving an evaluation application, results are generally updated within 7 working days

### **Evaluation Methodologies**

- **Accuracy-based QA Assessment**: Exact and fuzzy matching evaluation with both rule-based and LLM-based metrics
- **Interactive Simulation-based Testing**: Success rate metrics for comprehensive capability evaluation in navigation and task planning scenarios
- **LLM-driven Automatic Generation**: Unique approach ensuring diversity of scenarios and tasks while maintaining evaluation safety and high-quality assessment standards

---

## Join Embodied Arena

### **For Model Developers**

**Showcase Your Model**: Join the leaderboard competition, demonstrate your embodied AI capabilities across comprehensive benchmarks, and establish your model's position in the future of embodied intelligence.

**How to Contribute Your Model**:

1. Review evaluation requirements and supported formats
2. Submit your model for evaluation through our platform
3. Monitor performance across all benchmarks and capability dimensions
4. Gain visibility in the embodied AI research community

### **For Researchers**

**Contribute Benchmarks**: Co-create and share evaluation benchmarks with the community, establish distinctive leaderboards, and collectively shape the future of large-scale embodied AI evaluation.

**How to Contribute Benchmarks**:

1. Design innovative evaluation tasks for embodied AI
2. Ensure alignment with our capability taxonomy by mapping your benchmark's native capabilities to our 7 core capabilities and 25 fine-grained dimensions
3. Submit benchmark proposals with comprehensive documentation
4. Collaborate with the community to refine and improve evaluation methods

### **Getting Started**

1. **Explore Leaderboards**: Browse current model rankings and performance metrics
2. **Understand Capabilities**: Review our systematic capability taxonomy and benchmark mapping
3. **Join Evaluation**: Submit your models or benchmarks for community evaluation
4. **Engage with Community**: Participate in discussions and contribute to platform development

## Contact and Support

**Embodied Arena** is committed to advancing embodied AI evaluation through community collaboration and continuous innovation. For technical support, collaboration opportunities, or general inquiries, please reach out to our team.

---

🏆 **Embodied Arena** - An open-source, comprehensive, and user-friendly evaluation system and platform for embodied AI models
