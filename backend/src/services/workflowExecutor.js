import { executeStep } from "./llmService.js";

async function executeWorkflow(steps, inputText) {
  let currentOutput = inputText;
  const results = [];

  for (const step of steps) {
    const output = await executeStep(step, currentOutput);

    results.push({
      step,
      output,
    });

    currentOutput = output;
  }

  return results;
}

export default executeWorkflow;
