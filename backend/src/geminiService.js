import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
console.log("key is ",process.env.GEMINI_API_KEY)

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Example: Generate text
export async function generateText(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or gemini-pro
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}
