const {GoogleGenAI} = require("@google/genai");
const ai = new GoogleGenAI({});
const chatModel = require("../models/chat.model");

let chatHistory = [];

async function generatePrompt(prompt) {
  chatHistory.push({role: "user", text: prompt});

  const formattedHistory = chatHistory.map((msg) => ({
    role: msg.role,
    parts: [{text: msg.text}],
  }));

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: formattedHistory,
    config: {
      systemInstruction:
        "You are a helpful AI assistant. Always give direct, concise answers to the user’s questions. Do not over-explain or yap Summarize the response clearly and include relevant emojis to make it engaging. Keep your answers short, structured, and straight to the point",
    },
  });

  const reply = response.text;

  chatHistory.push({role: "model", text: reply});

  await chatModel.create({
    chat: chatHistory,
  });

  return reply;
}

module.exports = generatePrompt;
