const prefix = '!';


const responseObject = {
    "ayy": "Ayy, lmao!",
    "wat": "Say what?",
    "lol": "roflmao",
    "ClaDos": "You mean supercool dude?",
    "Mod": "Faggot"
};


const sql = require("sqlite");
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const https = require('https');


sql.open("./score.sqlite");


client.on('ready', () => {
    console.log('AM WAKE!');
});


client.on('message', message => {
    if (message.channel.type === "dm") return;
    if (message.content.match(/^!.+/)) {

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (responseObject[message.content]) {
            message.channel.send(responseObject[message.content]);
        }

        //Dont count points for bot users
        if (!message.author.bot) {
            sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
                if (!row) {
                    sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
                } else {
                    let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
                    if (curLevel > row.level) {
                        row.level = curLevel;
                        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
                        message.reply(`You've leveled up to level **${curLevel}**! You're a good boye!`);
                    }
                    sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
                }
            }).catch(() => {
                console.error;
                sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
                    sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
                });
            });

        }


        switch (command) {
            case 'mostkills':
                sql.all(`SELECT mode, MAX(kills) as k,players FROM wins GROUP BY mode`).then(rows => {
                    if (!rows) {
                        message.reply('nothing found');
                    } else {
                        rows.forEach(function (row) {
                            message.reply('Most Kills in ' + row.mode + ' is ' + row.k + ', done by ' + row.players)
                        });
                    }
                }).catch(() => {
                    console.error;
                    sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT)").then(() => {
                    });
                });

                break;


            case 'insertwin':
                switch (args[0]) {
                    case 'solo':
                        if (Number(args[1]) && args.length > 2) {
                            sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], args[2]]);
                            message.reply('I saved your win - GG!')
                        } else {
                            message.reply('Incorrect argument format, check !commands for instructions!')
                        }
                        break;
                    case 'duo':
                        if (Number(args[1]) && args.length > 2 && args.length < 5) {
                            let names = '';
                            for (let i = 2; i < args.length; i++) {
                                names += args[i] + ', ';
                            }
                            sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], names]);
                            message.reply('I saved your win - GG!')

                        } else {
                            message.reply('Incorrect argument format, check !commands for instructions!')
                        }
                        break;
                    case 'squad':
                        if (Number(args[1]) && args.length > 2 && args.length < 7) {
                            let names = '';
                            for (let i = 2; i < args.length; i++) {
                                names += args[i] + ', ';
                            }
                            sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], names]);
                            message.reply('I saved your win - GG!')

                        } else {
                            message.reply('Incorrect argument format, check !commands for instructions!')
                        }
                        break;
                    default:
                        message.reply('Incorrect argument format, check !commands for instructions!')
                }

                break;


            case 'maxsnipe':
                sql.get(`SELECT MAX(distance) as d, player FROM snipes`).then(row => {
                    if (!row) {
                        message.reply('nothing found');
                    } else {
                        message.reply('Longest snipe recorded is ' + row.d + ', done by ' + row.player)
                    }
                }).catch(() => {
                    sql.run("CREATE TABLE IF NOT EXISTS snipes (distance INTEGER,player TEXT)");
                });
                break;
            case 'insertsnipe':
                if (Number(args[0]) > 0) {
                    sql.run("INSERT INTO snipes (distance,player) VALUES (?, ?)", [Number(args[0]), message.author.username]).then(() => {
                        message.reply('I inserted your snipe of ' + args[0] + ' meters - GG!')
                    }).catch(() => {
                        sql.run("CREATE TABLE IF NOT EXISTS snipe (distance INTEGER,player TEXT)").then(() => {
                            sql.run("INSERT INTO snipes (distance,player) VALUES (?, ?)", [args[0], message.author.username]);
                            message.reply('I inserted your snipe of ' + args[0] + ' meters - GG!')
                        });
                    });
                } else {
                    message.reply('Invalid arguments, please use the following format: !insertSnipe [meters]')
                }
                break;


            case 'pet':
                sql.get(`SELECT pettage FROM botstats `).then(row => {
                    if (!row) {
                        sql.run("INSERT INTO botstats (pettage) VALUES (?)", [1]);
                    } else {
                        sql.run(`UPDATE botstats SET pettage = ${row.pettage + 1}`);
                    }
                }).catch(() => {
                    sql.run("CREATE TABLE IF NOT EXISTS botstats (pettage INTEGER)").then(() => {
                        sql.run("INSERT INTO botstats (pettage) VALUES (?)", [1]);
                    });
                });
                message.reply('THANK YOU HOOMAN =)');
                break;


            case 'goodboycount':
                sql.get(`SELECT pettage FROM botstats `).then(row => {
                    if (!row) {
                        message.reply('NO ONE CALLED ME GOOD BOY YET =(')
                    } else {
                        message.reply('CALLED GOOD BOY ' + row.pettage + ' TIMES!');
                    }
                }).catch(() => {
                    message.reply('NO ONE CALLED ME GOOD BOY YET =(')
                });
                break;


            case 'points':
                sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
                    if (!row) return message.reply("sadly you do not have any points yet!");
                    message.reply(`you have ${row.points} Internet points, way to go!`);
                });
                break;


            case 'level':
                sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
                    if (!row) return message.reply("You're level 0, start chatting to rank up!");
                    message.reply(`Your level is ${row.level}`);
                });
                break;


            case 'commands':
                message.reply('I can do the following:\n' +
                    '!pet -> Thank me for my services\n' +
                    '!goodboyCount -> See how much of a good boy i am\n' +
                    '!points/!level -> See how much time you wasted in here..\n' +
                    '!maxSnipe -> get the longest distance snipe in fortnite\n' +
                    '!insertSnipe [distance]-> Insert a snipe of yours into the DB\n' +
                    '!mostKills-> Get highest kill game for all modes in fortnite BR\n' +
                    '!insertWin [solo|duo|squad] [numberOfKills] [names separated with spaces]-> Insert a win of yours into the DB\n' +
                    '!ud [word(s)] ask Urban Dictionary for a word(s) you want to know about.\n');
                break;


            case 'ud':
                let argument = args.join(' ');
                https.get('https://api.urbandictionary.com/v0/define?term=' + argument, (resp) => {
                    let data = '';
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received.
                    resp.on('end', () => {
                        list = JSON.parse(data).list;
                        // respond in a hooman friendly way
                        let firstMessage = 'HERE\'S WHAT I KNOW ABOUT ' + '<<< ' + argument + ' >>> :\n';
                        let listDelimiter = 'OR:';
                        let maxDefinitions = 3;

                        message.reply(firstMessage);
                        for (let i = 0; i < list.length && i < maxDefinitions; i++) {
                            message.reply('DEFINITION:\n' + list[i].definition + '\n\nEXAMPLE:\n' + list[i].example);
                            if (i === (list.length - 1) || i === (maxDefinitions - 1)) {
                                // do nothing
                            }
                            else{
                                message.reply(listDelimiter);
                            }
                        }
                    });
                });
                break;

        }

    }


});


client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'general');
    if (!channel) return;
    channel.send(`ME BOT. ME GREET HUMAN: ${member}. HAVE GOOD TIME`);
    channel.send('(tipe !pet to pet the bot and show him who\'s a good boy)');
});

client.login(token);
