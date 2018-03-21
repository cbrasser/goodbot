const sf = require('snekfetch')
require('dotenv').config()

const token = process.env.GIPHY_TOKEN;

async function getSticker(message, tag='') {
    let res = await sf.get('https://api.giphy.com/v1/stickers/random?api_key='+token+'&tag='+tag+'&rating=R')
    const body = res.body;

    await message.channel.send(body.data.url)

}

exports.run = async function (client, message, args) {
    if(args[0]!=null){
        getSticker(message,args[0]);
    } else {
        getSticker(message);
    }

}