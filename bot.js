const prefixes = ['!', 'doggo '];


const responseObject = {
    "ayy": "Ayy, lmao!",
    "wat": "You mean: Say what?",
    "lol": "You mean: roflmao",
    "ClaDos": "You mean supercool dude?",
    "mod": "You mean: Faggot?",
    "yolo": "You mean: Carpe Diem?",
    "NFA": "Acronym for: No Fun Allowed"
};


const token = process.env.TOKEN;
const sql = require("sqlite");
const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https');
const http = require('http');
const express = require('express');
const sf = require('snekfetch')
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

async function getMeme(message,index){
  //let res = await sf.get('https://www.reddit.com/u/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=500')
  let res = await sf.get('https://www.reddit.com/r/dankmemes/top/.json?sort=top&t=day&limit=500')
  const allPosts = res.body.data.children.filter(post => post.data.preview)
  const post = allPosts[index]
  await message.channel.send({ embed: {
    title: post.data.title,
    url: post.data.url,
    image: { url: post.data.preview.images[0].source.url },
    description: post.data.url,
    footer: { text: `posted by ${post.data.author}` }
  }})


}

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

sql.open("./score.sqlite");


client.on('ready', () => {
    console.log('AM WAKE!');
});


client.on('message', message => {
    if (message.channel.type === "dm") return;
    if (!message.author.bot) {
      
      if (responseObject[message.content]) {
            message.channel.send(responseObject[message.content]);
        }
      
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) {
                sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
            } else {
                let curLevel = Math.floor(0.7 * Math.sqrt(row.points + 1));
                if (curLevel > row.level) {
                    message.reply(`You've leveled up to level **${curLevel}**! You're a good boye!`);
                }
                sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${curLevel} WHERE userId = "${message.author.id}"`).then(()=>{
                });

            }
        }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
                sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
            });
        });

    }

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
        const command = args.shift().toLowerCase();
        

        //Dont count points for bot users


        switch(command){
  case 'mostkills':
  sql.all(`SELECT mode, MAX(kills) as k,players FROM wins GROUP BY mode`).then(rows => {
  if (!rows) {
    message.reply('nothing found');
  } else {
    if(rows.length ==0){
     message.reply('No wins recorded yet!') 
    }
    rows.forEach(function (row) {
      message.reply('Most Kills in '+row.mode+' is '+row.k+', done by '+row.players)
    });
    }
}).catch(() => {
  console.error;
  sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT)").then(() => {
    message.reply('No wins recorded yet!')
  });
});

    break;
  case 'insertwin':
    switch (args[0]){
      case 'solo':
        if(Number(args[1]) && args.length>2) {
          sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1],args[2]]).then(() =>{
              message.reply('I saved your win - GG!')
          }).catch(()=>{
            sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT)").then(() => {
              sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1],args[2]])
            });
            
          });
        } else {
          message.reply('Incorrect argument format, check !commands for instructions!')
        }
        break;
      case 'duo':
        if(Number(args[1]) && args.length>2 && args.length <5) {
            let names = '';
            for(let i =2;i<args.length;i++){
              names += args[i]+', ';
            }
            sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1],names]).then(() =>{
              message.reply('I saved your win - GG!')
          }).catch(()=>{
            sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT)").then(() => {
              sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1],names])
            });
              });

      }else {
        message.reply('Incorrect argument format, check !commands for instructions!')
      }
      break;
    case 'squad':
      if(Number(args[1]) && args.length>2 && args.length <7) {
          let names = '';
          for(let i =2;i<args.length;i++){
            names += args[i]+', ';
          }
          sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1],names]).then(() =>{
              message.reply('I saved your win - GG!')
          }).catch(()=>{
            sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT)").then(() => {
              sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1],names])
            });
          });
    }else {
      message.reply('Incorrect argument format, check !commands for instructions!')
    }
      break;
    default:
      message.reply('Incorrect argument format, check !commands for instructions!')
    }

    break;
  case 'maxsnipe':
    sql.get("SELECT MAX(distance) as d, player, videoLink FROM snipes").then(row => {
    if (!row) {
      message.reply('nothing found');
    } else {
      message.reply('Longest snipe recorded is '+row.d+', done by '+row.player+'. Link:'+row.videoLink);
      }
  }).catch(() => {
    sql.run("CREATE TABLE IF NOT EXISTS snipes (distance INTEGER,player TEXT, videoLink TEXT)");
  });
    break;
  case 'insertsnipe':
    if(args.length>1 && Number(args[0])>0 && isUrl(String(args[1])) ){
      sql.run("INSERT INTO snipes (distance,player, videoLink) VALUES (?, ?,?)", [Number(args[0]), message.author.username,String(args[1])]).then(() =>{
        message.reply('I inserted your snipe of '+args[0]+' meters - GG!')
      }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS snipe (distance INTEGER,player TEXT,videoLink TEXT)").then(() => {
          sql.run("INSERT INTO snipes (distance,player,videoLink) VALUES (?, ?, ?)", [args[0], message.author.username, args[1]]);
          message.reply('I inserted your snipe of '+args[0]+' meters - GG!')
      });
    });
  } else {
    message.reply('Invalid arguments, please use the following format: !insertSnipe [meters] [videoURL]')
  }
    break;
  case 'pet':
  sql.get(`SELECT pettage FROM botstats `).then(row => {
    if (!row) {
      sql.run("INSERT INTO botstats (pettage) VALUES (?)", [1]);
    } else {
    sql.run(`UPDATE botstats SET pettage = ${row.pettage + 1}`);
}
  }).catch(() =>{
    sql.run("CREATE TABLE IF NOT EXISTS botstats (pettage INTEGER)").then(() =>{
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
      message.reply('CALLED GOOD BOY '+row.pettage+' TIMES!');
    }
  }).catch(()=>{
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
    message.reply('I can do the following:\n'+
                  '!pet -> Thank me for my services\n'+
                '!goodboyCount -> See how much of a good boy i am\n'+
              '!points/!level -> See how much time you wasted in here..\n'+
            '!maxSnipe -> get the longest distance snipe in fortnite\n'+
          '!insertSnipe [distance] [videoUrl]-> Insert a snipe of yours into the DB with link to the video\n'+
        '!mostKills-> Get highest kill game for all modes in fortnite BR\n'+
      '!insertWin [solo|duo|squad] [numberOfKills] [names separated with spaces]-> Insert a win of yours into the DB\n'+
    '!dbschema ->Get the schema of the db\n'+
    '!runsql [command] -> Make a query on the existing db (Only get queries)')
    break;
    case 'ayy':
      const ayy = client.emojis.find("name", "ayy");
      message.reply(`${ayy} LMAO`);
    break;

  case 'meme':
    let memeIndex=0;
    sql.get(`SELECT memeCount FROM botstats `).then(row => {
      if (!row) {
        sql.run("INSERT INTO botstats (memeCount) VALUES (?)", [0]);
      } else {
        memeIndex = row.memeCount;
        console.log(memeIndex)
        if(memeIndex>50){
          sql.run(`UPDATE botstats SET memeCount = 0`);
          getMeme(message, 0);
        } else {
          getMeme(message, memeIndex);
        }
      sql.run(`UPDATE botstats SET memeCount = ${row.memeCount + 1}`);
  }
    }).catch(() =>{
      sql.run("CREATE TABLE IF NOT EXISTS botstats (pettage INTEGER, memeCount INTEGER)").then(() =>{
        sql.run("INSERT INTO botstats (pettage, memeCount) VALUES (?,?)", [0,0]);
        memeIndex=0;
      });
    });
    break
    case 'dbschema':
        message.reply('the DB has the following tables:\n'+
        'snipes(distance, Player, videoLink)\n'+
        'botstats(pettage, memeCount)\n'+
        'wins(mode, kills, players)')
        break;
    case 'runsql':
        if(args.length>0){
            let query = '';
            for(let i=0;i<args.length;i++){
                query+=args[i]+' ';
            }
            console.log(query)
            sql.all(query).then(rows => {
                if(!rows){
                    message.reply('No result for your query')
                }else {
                    rows.forEach(function (row) {
                        message.reply(JSON.stringify(row))
                    });
                }
            }).catch(() =>{
                console.error;
                message.reply('Not a valid sql query!')
            })
        }
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
                        let list = JSON.parse(data).list;
                        // respond in a hooman friendly way
                        let maxDefinitions = 3;
                        for (let i = 0; i < list.length && i < maxDefinitions; i++) {
                            let urbanDictionaryResponse = '';
                            if(i===0){
                                urbanDictionaryResponse += 'HERE\'S WHAT I KNOW ABOUT ' + '[   ' + argument + '  ]:\n';
                            }
                            else {
                                urbanDictionaryResponse+= '\nOR:\n';
                            }
                            urbanDictionaryResponse += 'DEFINITION:\n' + list[i].definition + '\n\nEXAMPLE:\n' + list[i].example +'\n\n';
                            message.reply(urbanDictionaryResponse);
                        }
                    });
                });
                break;


          case 'ayy':
                const ayyy= client.emojis.find("name", "ayy");
                message.reply(`${ayyy} LMAO`);
                break;
          case 'ping':
            message.reply('outch');
            break;
}

    }


});


client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'general');
    if (!channel) return;
    channel.send(`ME BOT. ME GREET HUMAN: ${member}. HAVE GOOD TIME`);
    channel.send('(tipe !pet to pet the bot and show him who\'s a good boy and !commands to see what is available)');
});

client.login(token);
