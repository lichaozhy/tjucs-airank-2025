# OpenCompass Leaderboard Rules

## Large Language Model Leaderboard

### 1. CompassBench Large Language Leaderboard Rules

This leaderboard is based on the closed source benchmarks of OpenCompass, forming an objective comprehensive ranking and a subjective comprehensive ranking of large language models.

#### 1.1 Benchmark Source

- Related evaluation based on closed source benchmarks composed by OpenCompass
- Update benchmarks every three months
- OpenCompass team provide a publicly available example benchmark [Detail] to the community. When the evaluation dimension changes, the example benchmark will also be updated accordingly

#### 1.2 Model Type

- Significant open-source models

Select significant open-source models both domestically and internationally for evaluation. In order to improve the progressiveness of the leaderboard, outdated models with low performance will be removed from time to time. For example, after the release of Llama3, Llama2 will no longer be evaluated.

- Commercially available and accessible API models

  - Collaborated model manufacturers
    - Models that have already provided external services and participated in OpenCompass' evaluation will be evaluated for the latest version of the model by default when OpenCompass updates the leaderboard in the future
    - If you want to specify a model version for evaluation to join X quarterly leaderboard, you can write email to opencompass@pjlab.org.cn before the 25th of the X month
    - If there is an upgrade plan for API model during the evaluation period of X quarterly leaderboard, you can write an email to opencompass@pjlab.org.cn before the 25th of the X month and apply to withdraw from this quarterly ranking evaluation
  - New model manufacturers：
    - For newly released models from manufacturers that have never collaborated with before, the manufacturer need to write an email to opencompass@pjlab.org.cn before the 25th of the X month to apply evaluation.
    - If the model is open-source, please provide the weight link of Hugging Face or ModelScope. API model needs to provide link and version information
    - Please make sure to submit a PullRequest to OpenCompass in advance and include the implementation of your API. Currently, only OpenAI type API is supported. You can refer to https://github.com/open-compass/opencompass/blob/main/examples/eval_api_demo.py

- Internal iterative models and API with invitation access restriction currently do not support

```
Note

- If the model manufacturer has multiple sizes of models, OpenCompass team accepts evaluation applications for up to 2 models
- To ensure a completely identical experience to real users, OpenCompass obtains API models via regular purchasing channels and does not accept keys provided by model manufacturer
```

#### 1.3 Update Frequency

    The leaderboard is updated every three months and will be released at the beginning of the next quarterly period
    Within the time window of quarterly ranking updates, if there are new influential models, the evaluation results of the new models will be updated according to evaluation resource. The benchmarks for evaluating comes from last version, and the new models in the leaderboard will have special marking.

### 2. CompassAcademic Large Language Leaderboard Rules

OpenCompass selects influential open source academic benchmarks, evaluates large language models, and forms this CompassAcademic Large Language Leaderboard.

#### 2.1 Benchmark Source

- Influential open source academic benchmarks

#### 2.2 Model Type

- New open-source models released by institutions oversea
- Formally released models in China: including PR release, academic paper, GitHub Repo README clearly introducing models (publicly available)
- The API model willing to join (please provide the model key to opencompass@pjlab.org.cn)

```
Note

- Early data will always be retained as a reference
- The first and second types of models will be evaluated directly by OpenCompass team in accordance with academic and open-source community standards
- For new manufacturer, If it is an open-source model, please provide the model weights and links; If it is an API model, please provide the API link and specify the model version, and submit a PullRequest to OpenCompass in advance
```

#### 2.3 Update Frequency

- Starting from January 1, 2025, each manufacturer is only allowed to submit one evaluation application once a month
- Updated once a month
- We will take a snapshot of the results on the first working day at the beginning of each month as last monthly leaderboard

### 3. CompassArena Large Language Leaderboard Rules

The CompassArena Large Language Leaderboard compares the "competitive" performance of different large language models in the same task scenario to obtain real user feedback.

#### 3.1 Apply to join

- If any model manufacturer is interested in accessing CompassArena, please send an email to opencompass@pjlab.org.cn
- Each manufacturer can provide up to one model
- Starting from January 1, 2025, each large model manufacturer will be supported to apply for one internal and anonymous model to participate in CompassArena (anonymous mode)

#### 3.2 Update Frequency

- Update every Wednesday

Note

    If the model is required to enable networking function, Model manufacturer will need to provide free key
    When the model iterates, the new version of the model accumulates a certain number of valid votes and then its ranking appears in the leaderboard
    If the API model enables search function by default, Compass Arena will also open the search function, and mark "w/search" after the model name. For the API model do not enable search function by default, Compass Arena can add the version with search function, according to the model manufacturer's application

## OpenCompass Multi-modal Leaderboard Rules

### 1. OpenCompass Multi-modal Leaderboard Rules

This leaderboard is based on the closed source benchmarks of OpenCompass, forming an comprehensive ranking of multi-modal models.

#### 1.1 Benchmark Source

- Related evaluation based on closed source benchmarks composed by OpenCompass
- Update benchmarks every three months
- OpenCompass team provide a publicly available example benchmark to the community. When the evaluation dimension changes, the example benchmark will also be updated accordingly

#### 1.2 Model Type

- Significant open-source models

Select significant open-source models both domestically and internationally for evaluation. In order to improve the progressiveness of the leaderboard, outdated models with low performance will be removed from time to time. For example, after the release of Llama3, Llama2 will no longer be evaluated.

- Commercially available and accessible API models

  - Collaborated model manufacturers
    - Models that have already provided external services and participated in OpenCompass' evaluation will be evaluated for the latest version of the model by default when OpenCompass updates the leaderboard in the future
    - If you want to specify a model version for evaluation to join leaderboard, you can write email to opencompass@pjlab.org.cn before the 25th of the X month
    - If there is an upgrade plan for API model during the evaluation period of X quarterly leaderboard, you can write an email to opencompass@pjlab.org.cn before the 25th of the X month and apply to withdraw from this quarterly ranking evaluation
  - New model manufacturers：
    - For newly released models from manufacturers that have never collaborated with before, the manufacturer need to write an email to opencompass@pjlab.org.cn before the 25th of the X month to apply evaluation.
    - If the model is open-source, please provide the weight link of Hugging Face or ModelScope.
    - API model needs to provide link and version information. Recommend providing OpenAI type API, other types of API models need to submit PR in VLMEvalKit to support the model.

- Internal iterative models and API with invitation access restriction currently do not support

- For new applications, please be sure to submit a PullRequest in VLMEvalKit to support the new model
  - Example: Open source model that does not support custom prompts, implementation method reference: [Model] Support glm-4v-9b
  - Example: Open source model that supports custom prompts and any interleaved graphics and text. Implementation met - reference: Add MiniCPM-Llama3-V-2.5
  - Example: API model, implementation reference: Feature add glmv

```
Note

- If the model manufacturer has multiple sizes of models, OpenCompass team accepts evaluation applications for up to 2 models
- To ensure a completely identical experience to real users, OpenCompass obtains API models via regular purchasing channels and does not accept keys provided by model manufacturer
```

#### 1.3 Update Frequency

- The leaderboard is updated every three months and will be released at the beginning of the next quarterly period (Mar/Jun/Sep/Dec)
- Within the time window of two quarterly ranking updates, if there are new influential models, the evaluation results of the new models will be updated according to evaluation resource. The benchmarks for evaluating comes from last version, and the new models in the leaderboard will have special marking.

### 2. Academic Multi-modal Leaderboard Rules

OpenCompass selects influential open source academic benchmarks, evaluates multimodal models, and forms this OpenCompass Multi-modal Leaderboard.

#### 2.1 Benchmark Source

- Significant Open-source Model
- Commercially available and accessible API models
- Internal iterative models and API with invitation access restriction currently do not support

#### 2.2 Apply to join

- Write an email to opencompass@pjlab.org.cn, and apply to join
- Please make sure to submit a PullRequest in VLMEvalKit to support the new model
  - For open-source model which does not support custom prompt，you can refer to: [Model] Support glm-4v-9b
  - For the open-source model which supports custom prompt and Interleaved Image-Text，you can refer to: Add MiniCPM-Llama3-V-2.5
  - For API multimodal model，you can refer to: Feature add glmv

#### 2.3 Update Frequency

- Starting from January 1, 2025, each model manufacturer is only allowed to submit one evaluation application once a month
- After receiving the evaluation application, it is generally updated within 5 working days
- We will take a snapshot of the results on the first working day at the beginning of each month as last monthly leaderboard

### 3. OpenCompass Multi-modal Reasoning Leaderboard Rules

OpenCompass selects influential open-source and reasoning benchmarks, evaluates multimodal models, and forms this OpenCompass Multi-modal Leaderboard.

#### 3.1 Benchmark Source

- Significant Open-source Model
- Commercially available and accessible API models
- Internal iterative models and API with invitation access restriction currently do not support

#### 3.2 Apply to join

- Write an email to opencompass@pjlab.org.cn, and apply to join
- Please make sure to submit a PullRequest in VLMEvalKit to support the new model

  - For open-source model which does not support custom prompt，you can refer to: [Model] Support glm-4v-9b
  - For the open-source model which supports custom prompt and Interleaved Image-Text，you can refer to: Add MiniCPM-Llama3-V-2.5
  - For API multimodal model，you can refer to: Feature add glmv

    3.3 Update Frequency

        Starting from January 1, 2025, each model manufacturer is only allowed to submit one evaluation application once a month
        After receiving the evaluation application, it is generally updated within 5 working days

### 4. CompassArena Multi-modal Model Leaderboard Rules

The CompassArena Multi-modal Model Leaderboard compares the "competitive" performance of different multi-modal models in the same task scenario to obtain real user feedback.

#### 4.1 Apply to join

- If any model manufacturer is interested in accessing CompassArena, please send an email to opencompass@pjlab.org.cn
- Each manufacturer can provide up to one model
- Starting from January 1, 2025, each large model manufacturer will be supported to apply for one internal and anonymous model to participate in CompassArena (anonymous mode)

#### 4.2 Update Frequency

- Update every Wednesday

```
Note

- If the model is required to enable networking function, Model manufacturer will need to provide free key
- When the model iterates, the new version of the model accumulates a certain number of valid votes and then its ranking appears in the leaderboard
- If the API model enables search function by default, Compass Arena will also open the search function, and mark "w/search" after the model name. For the API model do not enable search function by default, Compass Arena can add the version with search function, according to the model manufacturer's application
```
