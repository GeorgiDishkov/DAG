const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const aiService = {
  async getBuildExplanation(champion, buildData) {
    try {
      const prompt = `You are a challenger level coach.
Champion: ${champion}
Best build: ${buildData.items.join(', ')}
Runes: ${buildData.runes.join(', ')}
Explain why this works and when to use it concisely.`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error getting AI explanation:', error);
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

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error summarizing patch notes:', error);
      return "I couldn't summarize the patch notes.";
    }
  }
};

module.exports = aiService;
