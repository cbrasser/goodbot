const sf = require('snekfetch')
require('dotenv').config()

const token = process.env.GIPHY_TOKEN;

async function getGif(message, tag='') {
    let res = await sf.get('https://api.giphy.com/v1/gifs/random?api_key='+token+'&tag='+tag+'&rating=R')
        const body = res.body;

    await message.channel.send(body.data.url)

}

exports.run = async function (client, message, args) {
    if(args[0]!=null){
        getGif(message,args[0]);
    } else {
        getGif(message);
    }

}