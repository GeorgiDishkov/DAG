const { ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'setupchannels',
  description: 'Creates top, mid, and bot read-only channels',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return message.reply('You do not have permission to manage channels.');
    }

    const channels = ['top', 'mid', 'bot', 'jungle'];
    for (const name of channels) {
      const channel = await message.guild.channels.create({
        name: name,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: message.guild.id, // @everyone
            allow: [PermissionFlagsBits.ViewChannel],
            deny: [PermissionFlagsBits.SendMessages],
          },
          {
            id: message.client.user.id, // Bot
            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
          },
        ],
      });
      message.channel.send(`Created channel: ${channel.name}`);
    }
  },
};
