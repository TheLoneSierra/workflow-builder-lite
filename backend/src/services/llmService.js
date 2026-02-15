import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

async function callLLM(systemPrompt, userInput) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput },
    ],
    temperature: 0.3,
  });

  return response.choices[0].message.content.trim();
}

export async function executeStep(stepType, input) {
  switch (stepType) {
    case "clean":
      return callLLM(
        "Clean the following text. Fix spacing and formatting. Do not change meaning.",
        input
      );

    case "summarize":
      return callLLM(
        "Summarize the following text clearly and concisely.",
        input
      );

    case "extract":
      return callLLM(
        "Extract the key points from the following text. Return them as bullet points.",
        input
      );

    case "tag":
      return callLLM(
        "Categorize the following text into a short category label (e.g., Technology, Finance, Health, Sports). Return only the category.",
        input
      );

    default:
      throw new Error("Invalid step type");
  }
}
