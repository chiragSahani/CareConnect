import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing VITE_GEMINI_API_KEY in .env file");
}

const genAI = new GoogleGenAI({apiKey: API_KEY});

async function runTest() {
  try {
    console.log("Running Gemini API test...");
    const response = await genAI.models.generateContent({
        model: "gemini-pro",
        contents: "Hello, world!",
    });
    console.log("Gemini API test response:", response.text);
  } catch (error) {
    console.error("Gemini API test failed:", error);
  }
}

runTest();
