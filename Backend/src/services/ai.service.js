const {GoogleGenAI} = require("@google/genai");
const ai = new GoogleGenAI({});

async function generatePrompt(prompt) {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return res.text;
}
module.exports = generatePrompt;
