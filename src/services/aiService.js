const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const aiService = {
  async getBuildExplanation(champion, buildData) {
    try {
      const prompt = `You are a challenger level coach.
Champion: ${champion}
Best build: ${buildData.items.join(', ')}
Runes: ${buildData.runes.join(', ')}
Explain why this works and when to use it concisely.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting AI explanation (Gemini):', error);
      return "I couldn't generate an explanation right now.";
    }
  },

  async summarizePatchNotes(patchNotes) {
    try {
      const prompt = `You are a high elo League of Legends analyst.
Patch notes:
${patchNotes}
Tasks:
Say if this is buff, nerf, or neutral
Explain impact in simple terms
Give 2–3 actionable tips
Keep it short and practical.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error summarizing patch notes (Gemini):', error);
      return "I couldn't summarize the patch notes.";
    }
  }
};

module.exports = aiService;
