const prefixes = ['!', 'doggo '];
const responseObject = {
    "ayy": "Ayy, lmao!",
    "lol": "You mean: roflmao",
    "mod": "You mean: Faggot?",
    "yolo": "You mean: Carpe Diem?",
    "NFA": "Acronym for: No Fun Allowed"
};
const token = 'NDA3NTU5NDg1MzczMjg0MzUz.DVDQ7Q.w4WE9LpInvReCOyUtfahNLFyLpo';

//Dependencies
const Discord = require('discord.js');
const client = new Discord.Client();
const http = require('http');
const express = require('express');
const app = express();
const fs = require("fs");
const sql = require("sqlite");

sql.open("./score.sqlite");

client.on('ready', () => {
    console.log('AM WAKE!');
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
            let commandFile = require(`./utility/addPoint.js`);
            commandFile.run(client, message);
        } catch (err) {
            console.error(err);
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
                console.log('some smartass tried to access a dir')
                message.reply('Dont try to access stuff you are not allowed to, not a good boye!');
            }
        } catch (err) {
            console.error(err);
            message.reply('Could not find your command, try !commands for a list!')
        }


    }

});

client.on('guildMemberAdd', member => {
    try {
        let commandFile = require(`./utility/addMember.js`);
        commandFile.run(client, member);
    } catch (err) {
        console.error(err);
    }
});

client.login(token);
