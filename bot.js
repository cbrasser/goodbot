const prefixes = ['!', 'doggo '];
var responseObject = {
    "ayy": "Ayy, lmao!",
    "mod": "You mean: Faggot?",
    "yolo": "You mean: Carpe Diem?",
    "NFA": "Acronym for: No Fun Allowed",
    "Nioransa": "You mean: spaghett?",
};

//Dependencies
const Discord = require('discord.js');
const client = new Discord.Client();
//TODO: Figure out if any of these three are actually needed
// const http = require('http');
// const express = require('express');
// const app = express();
const fs = require("fs");
const sqlite3 = require("sqlite3");
const logger = require("./logger");

// Access Discord api token
require('dotenv').config();
const token = process.env.TOKEN;


logger.info('Started process at '+new Date())

let db = new sqlite3.Database('./.db/data.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});


client.on('ready', () => {
    console.log('AM WAKE!');
    const channel = client.channels.find(function(channel) {return channel.name === 'devzone'});
    if (!channel) {
      return;
    } else {
    channel.send(`AM WOKE`);
    }
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./commands/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on('message', message => {
  
    //No commands in dms allowed
    if (message.channel.type === "dm") return; 
    //we dont want to track points for bots
    if (!message.author.bot) {
      
        //quick reply for messages specified above as a responceObject
        if (responseObject[message.content]) {
            message.channel.send(responseObject[message.content]);
        }
        //Manage points
        try {
          console.log('trying to get command file');
            let commandFile = require(`./utility/addPoint.js`);
            console.log(`got command file: ${commandFile}`);
            commandFile.run(client, message);
        } catch (err) {
            logger.error("error trying to add points: "+ err);
        }


    }
    //Check if message starts with one of the accepted prefixes
    let found = false;
    let foundIndex = -1;
    for (let i = 0; i < prefixes.length; i++) {
        let regex = new RegExp('^' + prefixes[i] + '.+');
        if (message.content.match(regex)) {
            found = true;
            foundIndex = i;
        }
    }
    if (found) { 
        const args = message.content.slice(prefixes[foundIndex].length).trim().split(/ +/g);
        //we dont want case sensitivity for commands
        const command = args.shift().toLowerCase();
        try {

            //load the corresponding .js file, we dont want anyone to be able to do directory shenanigans
            if(command.indexOf('/')===-1){
                let commandFile = require(`./commands/${command}.js`);
                commandFile.run(client, message, args);
            } else {
                logger.debug('some smartass tried to access a dir')
                message.reply('Dont try to access stuff you are not allowed to, not a good boye!');
            }
        } catch (err) {
            logger.error(err);
            message.reply('Could not find your command, try !commands for a list!')
        }


    }

});

client.on('guildDelete', guild => {
    logger.info('I have left guild '+ guild.name+ ' at '+new Date());
});

client.on('guildCreate',guild => {
    logger.info('I have joined guild '+guild.name+' at '+new Date());
    const channel = guild.channels.find('name', 'general');
    if (!channel) return;
    channel.send(`ME BOT. ME GREET HUMANS, HAVE GOOD TIME`);
    channel.send('(tipe !pet to pet the bot and show him who\'s a good boy and !commands to see what is available)');
  
})

client.on('guildMemberAdd', member => {
    try {
        let commandFile = require(`./utility/addMember.js`);
        commandFile.run(client, member);
    } catch (err) {
        console.error(err);
    }
});

client.login(token).then(console.log)
 .catch( err => {
  console.error
  console.log('token: '+token+' seems to be invalid');
 });
