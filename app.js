// Copyright 2024 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// ---------------------------------------------------------------------------------------- //

import {FilesetResolver, LlmInference} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai';

const input = document.getElementById('input');
const output = document.getElementById('output');
const submit = document.getElementById('submit');

// const modelFileName = 'assets/gemma-3n-E2B-it-int4.task'; /* Update the file name */


const modelFileName = 'assets/gemma-3n-E4B-it-int4.task'; /* Update the file name */

let llmInference;

/**
 * Display newly generated partial results to the output text box.
 */
function displayPartialResults(partialResults, complete) {
  output.textContent += partialResults;

  if (complete) {
    if (!output.textContent) {
      output.textContent = 'Result is empty';
    }
    submit.disabled = false;
  }
}

/**
 * Main function to run LLM Inference.
 */
async function runDemo() {
  const genaiFileset = await FilesetResolver.forGenAiTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai/wasm');

  submit.onclick = () => {
    output.textContent = '';
    submit.disabled = true;
    let prompt = `<start_of_turn>model
        You are a helpful assistant. Do not use emojis in your responses.<end_of_turn>
        <start_of_turn>user
        ${input.value}<end_of_turn>
        <start_of_turn>model
    `
    console.log(prompt);
    llmInference.generateResponse(prompt, displayPartialResults);
  };

  submit.value = 'Loading the model...'

  try {
    llmInference = await LlmInference.createFromOptions(genaiFileset, {
        baseOptions: {
          modelAssetPath: modelFileName
        },
        maxTokens: 512,
        topK: 40,
        temperature: 0.7,
      });
      submit.disabled = false;
      submit.value = 'Get Response'
  } catch(e) {
      console.group("LlmInference Initialization Failed");
      console.error("An error occurred during the createFromOptions() call.");
      console.log(`Error Type: ${e.name}`);
      console.log(`Error Message: ${e.message}`);
      console.dir(e);
      console.groupEnd();
      alert('Failed to initialize the task.');
    };
}

runDemo();