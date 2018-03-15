const sf = require('snekfetch')
const Discord = require('discord.js');
require('dotenv').config()

const token = process.env.TRN_TOKEN;

async function getStats(client,message, platform, epicName) {

    let res = await sf.get('https://api.fortnitetracker.com/v1/profile/'+platform+'/'+epicName)
        .set('TRN-Api-Key', TRN_TOKEN)
    const name = res.body.epicUserHandle;
    const lifeTimeStats = res.body.lifeTimeStats;
    //stats is containing more information, didn't have the time to extract the useful part yet
    //Instead using lifetimeStats for now because they are more simple
    //const stats = res.body.stats;

    var embed = new Discord.RichEmbed()
        .setTitle("Fortnite Stats - "+name)
        .setAuthor("GoodBot", client.user.avatarURL)
        .setColor(3447003)
        .setDescription("Lifetime Stats");

    for (let i=0;i<lifeTimeStats.length;i++) {
        console.log(lifeTimeStats[i])
        embed.addField(lifeTimeStats[i].key, lifeTimeStats[i].value)
    }
    message.channel.send({embed});
}

exports.run = async function (client, message, args) {
    getStats(client,message, args[0], args[1])
}