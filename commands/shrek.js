exports.run = (client, message, args) => {
    const shrekEmoji = client.emojis.find('name', 'shrek');
    message.reply(`${shrekEmoji} Shrek is love, Shrek is life. ${shrekEmoji}`);
};