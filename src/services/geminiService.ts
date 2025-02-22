
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const MODEL_NAME = "gemini-2.0-pro-exp-02-05";

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: MODEL_NAME });
  }

  async chat(message: string): Promise<string> {
    try {
      const result = await this.model.generateContent([
        { text: message }
      ]);
      return result.response.text();
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    }
  }

  async transcribeAudio(audioBase64: string, mimeType: string = "audio/wav"): Promise<string> {
    try {
      const result = await this.model.generateContent([
        {
          inlineData: {
            mimeType: mimeType,
            data: audioBase64
          }
        },
        { text: "Please transcribe the spoken language in this audio accurately. Ignore any background noise or non-speech sounds." },
      ]);

      return result.response.text();
    } catch (error) {
      console.error("Transcription error:", error);
      throw error;
    }
  }
}
