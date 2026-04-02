const axios = require('axios');

const BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/14.6.1/data/en_US'; // Note: Version needs to be updated periodically

const riotService = {
  async getChampionData(championName) {
    try {
      // In a real app, you'd probably map common names to IDs
      const formattedName = championName.charAt(0).toUpperCase() + championName.slice(1).toLowerCase();
      const response = await axios.get(`${BASE_URL}/champion/${formattedName}.json`);
      return response.data.data[formattedName];
    } catch (error) {
      console.error('Error fetching champion data:', error);
      return null;
    }
  },
  
  // Placeholder for real build data
  async getBuildData(champion) {
    // This is where you'd connect to a real build API or scrape a site
    return {
      champion,
      items: ['Doran\'s Blade', 'Kraken Slayer', 'Infinity Edge'],
      runes: ['Lethal Tempo', 'Presence of Mind']
    };
  },

  async getLatestPatchNotes() {
    // Placeholder: In real app, fetch from Riot's API or scrape patch site
    return `Champion Changes:
- Caitlyn: Q damage increased from 50/80/110 to 60/90/120.
- Zed: W cooldown increased from 20s to 22s.`;
  }
};

module.exports = riotService;
