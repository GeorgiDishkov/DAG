const riotService = require('../services/riotService');
const aiService = require('../services/aiService');

module.exports = {
  name: 'build',
  description: 'Get best build for a champion',
  async execute(message, args) {
    if (!args.length) {
      return message.reply('Please specify a champion name: !build <champion>');
    }
    const champion = args[0];
    
    // Simulate fetching data
    const buildData = await riotService.getBuildData(champion);
    
    if (!buildData) {
      return message.reply(`Could not find build data for ${champion}.`);
    }

    message.reply(`Fetching coach advice for ${champion}...`);
    
    const explanation = await aiService.getBuildExplanation(champion, buildData);

    message.channel.send(`**Best build for ${champion}:**\nItems: ${buildData.items.join(', ')}\nRunes: ${buildData.runes.join(', ')}\n\n**Coach Advice:**\n${explanation}`);
  },
};
