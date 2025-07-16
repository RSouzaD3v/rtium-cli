import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function GenerateContent(contents: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
        temperature: 1
    }
  });
  return response.text;
}