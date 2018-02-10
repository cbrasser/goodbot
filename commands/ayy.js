exports.run = (client, message, args) => {
    const ayy = client.emojis.find("name", "ayy");
    message.reply(`${ayy} LMAO`);
}