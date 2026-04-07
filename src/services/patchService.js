const axios = require('axios');
const OpenAI = require('openai');
const cheerio = require('cheerio');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getLatestPatches() {
  const url = 'https://www.leagueoflegends.com/en-us/news/game-updates/';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  
  // Select news items. Structure might change, this is a best guess.
  const patchArticles = [];
  $('.news-card').each((i, el) => {
    const title = $(el).find('.news-card__title').text();
    const link = 'https://www.leagueoflegends.com' + $(el).find('a').attr('href');
    if (title.toLowerCase().includes('patch')) {
      patchArticles.push({ title, link });
    }
    if (patchArticles.length >= 10) return false;
  });

  // Fetch content for the latest patch notes specifically
  if (patchArticles.length > 0) {
      const { data: patchData } = await axios.get(patchArticles[0].link);
      const $patch = cheerio.load(patchData);
      const content = $patch('.patch-notes-content').text() || $patch('main').text();
      return { title: patchArticles[0].title, content };
  }
  
  return { title: "No patch found", content: "..." };
}


async function summarizeAndCategorize(patchData) {
  const prompt = `
    Summarize these LoL patch notes into a concise, readable format for Discord.
    Then, categorize the changes into 'top', 'mid', 'bot' based on champion lane or role (items/systems can go to bot).
    Format as JSON: { "top": "...", "mid": "...", "bot": "..." }
    Content: ${patchData.content}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = { getLatestPatches, summarizeAndCategorize };
