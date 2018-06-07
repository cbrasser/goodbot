const Discord = require("discord.js");
const fs = require("fs");
exports.run = async (client, message, fileurl) => {
    let channel;
    if(!message.member.voiceChannel) {
        return message.reply('join a voice channel fam')
    }
    let perms;
    for(let i=0;i<message.guild.channels.size;i++){
        let channels = message.guild.channels.array()
        if(channels[i].id == message.member.voiceChannelID){
            perms = channels[i].permissionsFor(client.user);
            channel = channels[i];
        }
    }
    if (!perms.has('CONNECT') || !perms.has('SPEAK') || !perms.has('USE_VAD')) {
        return message.reply('Make sure I have `connect`, `speak`, and `use voice activity` permissions in the channel settings so I can do this command!\n\nHow to do that: https://i.imgur.com/ugplJJO.gif')
    }
    if (client.voiceConnections.has(message.channel.guild.id)) {
        if (!client.voiceConnections.get(message.channel.guild.id).playing) {
            client.voiceConnections.remove(client.voiceConnections.get(message.channel.guild.id))
        }
        if (this.cmdProps.skipIfPlaying && client.voiceConnections.get(message.channel.guild.id)) {
            client.voiceConnections.get(message.channel.guild.id).stopPlay}
    }


    const ytdl = require('ytdl-core');
    const streamOptions = { seek: 0, volume: 0.4 };
    const conn = await channel.join();
    conn.playArbitraryInput(fileurl, streamOptions);

    setTimeout(() => checkBorkVoice(client,message.channel), 5000)

    conn.once('end', async () => {
        await channel.leave() // TODO: Don't run this if it's being skipped
    })


}

async function checkBorkVoice (client,channel) {
    const voiceConnection = client.voiceConnections.get(channel.guild.id)

    if (voiceConnection) {
        if (!voiceConnection.speaking) {
            await voiceConnection.channel.leave();
            //channel.send('Hm, it seems that I am in the voice channel but not playing anything. I decided to leave')
            return;
        }
        return setTimeout(() => checkBorkVoice(client,channel), 10000)
    }
}

module.exports.help = {
    name: "hey"
}