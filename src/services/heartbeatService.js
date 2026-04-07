const axios = require('axios');

function startHeartbeat() {
  const port = process.env.PORT || 3000;
  const url = `http://localhost:${port}`;
  
  // Ping every 10 minutes (600,000ms)
  setInterval(async () => {
    try {
      await axios.get(url);
      console.log('Heartbeat ping successful at', new Date().toISOString());
    } catch (error) {
      console.error('Heartbeat ping failed:', error.message);
    }
  }, 10 * 60 * 1000);
}

module.exports = { startHeartbeat };
