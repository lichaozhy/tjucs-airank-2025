# Embodied Arena Platform Documentation

## Platform Overview

**Embodied Arena** is a comprehensive evaluation platform specifically designed for Embodied AI, providing a competitive arena-style assessment system for embodied intelligence benchmarks and models. As an authoritative evaluation platform in the embodied AI field, Embodied Arena is committed to advancing the development and standardization of embodied intelligence technologies.

## Key Features

- **Specialized Focus**: First comprehensive embodied AI evaluation platform in China
- **Complete Coverage**: Encompasses three core domains: Q&A, navigation, and task planning
- **Real-time Rankings**: Dynamic model performance leaderboards
- **Open & Transparent**: Supports online evaluation and benchmark contributions
- **Academic Authority**: Backed by Tianjin University Deep Reinforcement Learning Laboratory

## Three Core Leaderboards

### 1. Embodied Question Answering Leaderboard

**Purpose**: Evaluate models' ability to understand and answer questions in embodied environments

**Evaluation Dimensions**:

- **Total Score**: Comprehensive evaluation metric
- **UniEQA**: Unified embodied question answering benchmark
- **OpenEQA**: Open-domain embodied question answering

### 2. Embodied Navigation Leaderboard

**Purpose**: Assess models' spatial understanding and path planning capabilities in complex environments

**Core Capabilities**:

- Basic instruction navigation
- Complex instruction navigation
- Long-horizon instruction navigation

### 3. Embodied Task Planning Leaderboard

**Purpose**: Evaluate models' planning and decision-making abilities for complex task execution

**Core Capabilities**:

- Basic instruction planning
- Complex instruction planning
- Long-horizon instruction planning

## Seven Core Capability Framework

### 🔍 Object Perception

- **Object Type**: Object category recognition (e.g., "table", "chair")
- **Object Property**: Object attribute recognition (e.g., "color", "shape", "material", "size")
- **Object State**: Object state recognition (e.g., "open", "closed", "stationary")
- **Object Count**: Object quantity recognition (e.g., "number of chairs")

**Supported Benchmarks**: PhyBench (USC, UC Berkeley), VSI-Bench, ERQA (Google), RoBoVQA, OpenEQA (Meta), EgoThink (Tsinghua), EB-ALFRED, EB-Habitat

### 📐 Spatial Perception

- **Spatial Relationship**: Relative spatial relationships between objects (e.g., "next to", "above")
- **Spatial Distance**: Relative distances or measurements between objects (e.g., "closer", "3 meters")
- **Spatial Direction**: Object direction relative to reference points (e.g., "front-left", "back-right")
- **Spatial Localization**: Object positions in space (e.g., "location description", "bounding boxes")
- **Spatial Scale**: Object spatial dimensions (e.g., "drawer space size")

**Supported Benchmarks**: PhyBench (USC, UC Berkeley), VSI-Bench, ERQA (Google), EgoThink (Tsinghua), ScanQA (Kyoto University), Scan2Cap, ET-Plan Bench

### ⏰ Temporal Perception

- **Temporal Order**: Sequence of action occurrence (e.g., "open fridge, grab apple, close fridge")
- **Duration Estimation**: Action duration based on visual input prediction

**Supported Benchmarks**: PhyBench (USC, UC Berkeley), VSI-Bench, ET-Plan Bench

### 🧠 Embodied Knowledge

- **Common Sense**: Universal knowledge and experience (e.g., "Where to find drinking water in a kitchen?")
- **Affordance Prediction**: Predicting whether objects can support robot operations (e.g., mop for cleaning, graspable handle positions)

**Supported Benchmarks**: OpenEQA (Meta), EB-Navigation, EB-ALFRED, EB-Habitat

### 🎯 Embodied Reasoning

- **Static Embodied Reasoning**: Reasoning based on static embodied scenes (e.g., inferring observable objects given robot position and orientation)
- **Dynamic Embodied Reasoning**: Reasoning based on dynamic embodied scene changes (e.g., predicting future states from object trajectories, behavior reasoning, task progress reasoning)

**Supported Benchmarks**: PhyBench (USC, UC Berkeley), ERQA (Google), RoBoVQA, EgoThink (Tsinghua), Scan2Cap

### 🧭 Embodied Navigation

- **Basic Navigation**: Simple, clearly described navigation tasks
- **Complex Navigation**: Navigation with ambiguous instructions or distracting information
- **Long-horizon Navigation**: Tasks with steps twice as complex as basic navigation

**Supported Benchmarks**: EB-Navigation, R2R-CE, RxR-CE, ET-Plan Bench

### 📋 Embodied Task Planning

- **Basic Planning**: Simple, clearly described embodied task planning
- **Complex Planning**: Planning with ambiguous instructions or distracting information
- **Long-horizon Planning**: Tasks with steps twice as complex as basic planning

**Supported Benchmarks**: VSI-Bench, ERQA (Google), RoBoVQA, EgoThink (Tsinghua), EB-ALFRED, EB-Habitat

## Supported Model Types

### 🌟 General Large Language Models (LLMs)

**Representative Models**: GPT-4o, Claude-3.5-Sonnet, Gemini series, Qwen series, LLaVA series, MiniCPM-V series, InternVL series

- Strong language understanding and reasoning capabilities
- Suitable for Q&A and high-level reasoning tasks
- Vision-language understanding abilities
- Image and video content analysis

### 🤖 Embodied Multimodal LLMs

**Representative Models**: EmbodiedGPT, RoboBrain, SpatialBot

- Specifically optimized for embodied tasks
- Outstanding spatial understanding and navigation capabilities

### 🌍 3D Vision Models

**Representative Models**: Video-3D LLM, Grounded-3D-LLM, 3D-Mem

- Three-dimensional spatial understanding capabilities
- Point cloud and 3D scene processing

## Benchmark Specifications

### 🔬 2D Visual Reasoning Benchmarks

#### **PhyBench (USC, UC Berkeley)**

- **Function**: Physical reasoning benchmark
- **Content**: Object attributes, spatial relationships, physical law understanding
- **Features**: Covers mass, color, distance, depth, collision concepts

#### **VSI-Bench**

- **Function**: Visual spatial intelligence benchmark
- **Content**: Object size, relative/absolute distance, direction, room dimensions
- **Features**: Focuses on spatial cognition and path planning

#### **ERQA (Google)**

- **Function**: Embodied reasoning Q&A
- **Content**: State estimation, spatial reasoning, trajectory reasoning, task reasoning
- **Features**: Combines visual understanding with logical reasoning

#### **Where2Place**

- **Function**: Affordance prediction benchmark
- **Content**: Object placement prediction and functional reasoning
- **Features**: Evaluates robot understanding of object functionality

#### **RoBoVQA**

- **Function**: Robot visual question answering
- **Content**: Discriminative/generative affordances, success/future prediction
- **Features**: Designed specifically for robotic applications

#### **OpenEQA (Meta)**

- **Function**: Open-domain embodied Q&A
- **Content**: Object/attribute/state recognition, world knowledge, functional reasoning
- **Features**: Open-domain embodied intelligence evaluation

#### **EgoThink (Tsinghua)**

- **Function**: First-person perspective reasoning
- **Content**: Existence, attributes, spatial relationships, counting, comparison, localization
- **Features**: Simulates human first-person cognitive processes

#### **ScanQA (Kyoto University)**

- **Function**: 3D scene understanding Q&A
- **Content**: Spatial scene understanding, dense caption generation
- **Features**: Real 3D scanned scene-based Q&A tasks

#### **SQA3D (BIGAI)**

- **Function**: 3D spatial Q&A
- **Content**: Situational reasoning assessment
- **Features**: Complex reasoning with 3D spatial information

#### **Scan2Cap**

- **Function**: 3D scene description generation
- **Content**: Dense caption generation, spatial understanding
- **Features**: Natural language description from 3D point clouds

### 🎮 3D Interactive Environment Benchmarks

#### **EB-Navigation**

- **Function**: Embodied navigation evaluation
- **Content**: Basic/complex/long-horizon navigation, common sense reasoning
- **Features**: Comprehensive navigation capability assessment across complexity levels

#### **R2R-CE**

- **Function**: Room-to-room navigation (continuous environment)
- **Content**: Basic instruction navigation
- **Features**: Natural language navigation in real environments

#### **RxR-CE**

- **Function**: Multilingual navigation (continuous environment)
- **Content**: Long-horizon instruction navigation
- **Features**: Multilingual complex navigation tasks

#### **EB-ALFRED**

- **Function**: Embodied task planning evaluation
- **Content**: Basic/complex/long-horizon planning, visual appearance, common sense
- **Features**: Complex task execution in household environments

#### **EB-Habitat**

- **Function**: Habitat environment task planning
- **Content**: Basic/complex planning, visual appearance, common sense reasoning
- **Features**: Realistic 3D indoor environment tasks

#### **ET-Plan Bench**

- **Function**: Embodied task planning benchmark
- **Content**: Spatial/temporal understanding, basic navigation/planning
- **Features**: Comprehensive task planning capability assessment

## Platform Advantages

### 🎯 Professionalism

- First Chinese platform focused on embodied AI
- Covers core embodied intelligence capability dimensions
- Supported by authoritative academic institutions

### 🔄 Real-time Performance

- Dynamic leaderboard updates
- Real-time model performance comparisons
- Timely inclusion of latest models

### 🌐 Openness

- Online evaluation submission support
- Open benchmark contributions
- Transparent evaluation methods and metrics

### 📊 Comprehensiveness

- Multi-dimensional capability assessment
- Multi-type model support
- Diverse benchmark coverage

### 🔧 User-friendliness

- Intuitive web interface
- Detailed user guides
- Comprehensive documentation

## Usage Guide

1. **Browse Leaderboards**: View latest model performance rankings
2. **Online Evaluation**: Submit your models for evaluation
3. **Contribute Benchmarks**: Contribute new benchmarks to the platform
4. **View Details**: Learn about specific evaluation rules and metrics

## Contact Us

- **Host Institution**: Tianjin University Deep Reinforcement Learning Laboratory
- **Copyright**: © 2025 Tianjin University All Rights Reserved
- **Technical Support**: Tianjin University Deep Reinforcement Learning Laboratory

**Embodied Arena** - The Professional Evaluation Platform Advancing Embodied Intelligence Technology
