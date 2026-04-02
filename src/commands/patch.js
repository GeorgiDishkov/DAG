const riotService = require('../services/riotService');
const aiService = require('../services/aiService');

module.exports = {
  name: 'patch',
  description: 'Summarize patch notes',
  async execute(message, args) {
    message.reply('Fetching patch notes and analyzing...');
    
    const patchNotes = await riotService.getLatestPatchNotes();
    const summary = await aiService.summarizePatchNotes(patchNotes);
    
    message.channel.send(`**Patch Analysis:**\n${summary}`);
  },
};
