const { getLatestPatches, summarizeAndCategorize } = require('./patchService');

async function checkAndPostPatches(client) {
  try {
    console.log('Checking for new patches...');
    const patchData = await getLatestPatches();
    
    // In a real implementation, compare with previous patch hash/version to avoid duplicate posts
    const summary = await summarizeAndCategorize(patchData);

    // Assuming channels top, mid, bot exist
    for (const guild of client.guilds.cache.values()) {
        const topChannel = guild.channels.cache.find(c => c.name === 'top');
        const midChannel = guild.channels.cache.find(c => c.name === 'mid');
        const botChannel = guild.channels.cache.find(c => c.name === 'bot');

        if (topChannel) await topChannel.send(summary.top);
        if (midChannel) await midChannel.send(summary.mid);
        if (botChannel) await botChannel.send(summary.bot);
    }
  } catch (error) {
    console.error('Error in autoUpdater:', error);
  }
}

function startAutoUpdater(client) {
  // Check every 24 hours
  setInterval(() => checkAndPostPatches(client), 24 * 60 * 60 * 1000);
  // Also run on startup
  checkAndPostPatches(client);
}

module.exports = { startAutoUpdater };
