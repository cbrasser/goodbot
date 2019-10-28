exports.run = (client, member) => {
    const channel = member.guild.channels.find('name', 'general');
    if (!channel) return;
    channel.send(`ME BOT. ME GREET HUMAN: ${member}. HAVE GOOD TIME`);
    channel.send('(tipe !pet to pet the bot and show him who\'s a good boy and !commands to see what is available)');
}
