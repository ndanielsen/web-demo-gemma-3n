# Web Demo - Gemma 3N

How to run Gemma 3n locally. 

Adapted from [mediapipe-samples](https://github.com/google-ai-edge/mediapipe-samples/tree/main/examples/llm_inference/js)

## How to set it up

Download the .task file from here:

https://huggingface.co/google/gemma-3n-E4B-it-litert-preview

Create `assets/` folder and put that `.task` file is there.

Make sure that `modelFileName` in `app.js` is pointing to the correct model

## Run it locally

Use a web system like python to serve it up:

```bash
python -m http.server 8000
```

Note that your system might not have enough memory for this and you'll get some type of buffer error.