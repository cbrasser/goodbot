
const prefix = '!';
const token ='NDA3NTU5NDg1MzczMjg0MzUz.DVDQ7Q.w4WE9LpInvReCOyUtfahNLFyLpo';


const responseObject = {
  "ayy": "Ayy, lmao!",
  "wat": "Say what?",
  "lol": "roflmao",
  "ClaDos": "You mean supercool dude?",
  "Mod": "Faggot"
};



const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
var currentContext;
try {
    currentContext = JSON.parse(fs.readFileSync("./context.json", "utf8"));
}
catch(err) {
    console.log('No context')
    currentContext = new context();
}



function context(){
  this.longestSnipe =[0,''];
  this.mostKillsSolo =[0,''];
  this.mostKillsDuo =[0,''];
  this.mostKillsSquad =[0,''];
  this.petAmount=0;
  this.userstats = {};
}

client.on('ready', () => {
  console.log('I am ready!');
});


client.on('message', message => {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(responseObject[message.content]) {
    message.channel.send(responseObject[message.content]);
  }

  //Dont count points for bot users
  if (!message.author.bot) {
    //Check if user already has an entry
    if (!currentContext.userstats[message.author.id]) currentContext.userstats[message.author.id] = {
    points: 0,
    level: 0
  };
    currentContext.userstats[message.author.id].points++;
    let currPoints=currentContext.userstats[message.author.id].points;
    for(let i =0;i<10;i++){
      if(currPoints-1<Math.pow(2,i)){
        if(currPoints==Math.pow(2,i)){
          //Level up, points needed for growing levels increasing quadratically
          currentContext.userstats[message.author.id].level++;
          message.reply('YOU LEVELED UP. YOU AREA A GOOD BOY. YOU ARE LEVEL '+currentContext.userstats[message.author.id].level+' NOW.');
        }
      }
    }
  }

switch(command){



  case 'mostkills':
    message.reply('Most kills in Solo: '+currentContext.mostKillsSolo[0] + ', by '+currentContext.mostKillsSolo[1]+'\n'+
                  'Most kills in Duo: '+currentContext.mostKillsDuo[0] + ', by '+currentContext.mostKillsDuo[1]+'\n'+
                  'Most kills in Squad: '+currentContext.mostKillsSquad[0] + ', by '+currentContext.mostKillsSquad[1])
    break;
  case 'updatemostkills':
    switch (args[0]){
      case 'solo':
        if(Number(args[1]) && args.length>2) {
          if(Number(args[1])>currentContext.mostKillsSolo[0]){
            currentContext.mostKillsSolo[0] = Number(args[1]);
            currentContext.mostKillsSolo[1] = args[2];
            message.reply('New most kills in Solo: '+currentContext.mostKillsSolo[0] + ', by '+currentContext.mostKillsSolo[1]+' - GG!')
          }else {
            message.reply('This is not a new record!')
          }
        } else {
          message.reply('Incorrect argument format, check !commands for instructions!')
        }
        break;
      case 'duo':
        if(Number(args[1]) && args.length>2 && args.length <5) {
          if(Number(args[1])>currentContext.mostKillsDuo[0]){
            currentContext.mostKillsDuo[0] = Number(args[1]);
            let names = '';
            for(let i =2;i<args.length;i++){
              names += args[i]+', ';
            }
            currentContext.mostKillsDuo[1] = names;
            message.reply('New most kills in Duo: '+currentContext.mostKillsDuo[0] + ', by '+currentContext.mostKillsDuo[1]+' - GG!')
          }else {
            message.reply('This is not a new record!')
        }
      }else {
        message.reply('Incorrect argument format, check !commands for instructions!')
      }
      break;
    case 'squad':
      if(Number(args[1]) && args.length>2 && args.length <7) {
        if(Number(args[1])>currentContext.mostKillsSquad[0]){
          currentContext.mostKillsSquad[0] = Number(args[1]);
          let names = '';
          for(let i =2;i<args.length;i++){
            names += args[i]+', ';
          }
          currentContext.mostKillsSquad[1] = names;
          message.reply('New most kills in Squad: '+currentContext.mostKillsSquad[0] + ', by '+currentContext.mostKillsSquad[1]+' - GG!')
        }else {
          message.reply('This is not a new record!')
      }
    }else {
      message.reply('Incorrect argument format, check !commands for instructions!')
    }
      break;
    default:
      message.reply('Incorrect argument format, check !commands for instructions!')
    }

    break;
  case 'snipedist':
    message.reply('Longest Snipe: '+currentContext.longestSnipe[0]+'m, by '+currentContext.longestSnipe[1]);
    break;
  case 'updatesnipedist':
    if(Number(args[0])> Number(currentContext.longestSnipe[0])){
      console.log('true')
      currentContext.longestSnipe[0] = args[0];
      currentContext.longestSnipe[1] = message.author.username;
      message.reply('New longest Snipe: '+currentContext.longestSnipe[0]+'m, by '+currentContext.longestSnipe[1]+' - GG! Please provide some Evidence.');
    } else {
      message.reply('This is not a new record')
    }
    break;
  case 'pet':
    currentContext.petAmount++;
    message.reply('THANK YOU HOOMAN');
    break;
  case 'goodboycount':
    message.reply('CALLED GOOD BOY '+currentContext.petAmount +' TIMES!');
    break;
  case 'points':
    if (!currentContext.userstats[message.author.id]) currentContext.userstats[message.author.id] = {
      points: 0,
      level: 0
    };
    let tmpPoints= currentContext.userstats[message.author.id].points;
    message.reply('You have '+tmpPoints+' Internet Points')
    break;
  case 'level':
    if (!currentContext.userstats[message.author.id]) currentContext.userstats[message.author.id] = {
      points: 0,
      level: 0
    };
    let tmp= currentContext.userstats[message.author.id].level;
    message.reply('You have Level '+tmp)
    break;
  case 'commands':
    message.reply('I can do the following:\n'+
                  '!pet -> Thank me for my services\n'+
                '!goodboyCount -> See how much of a good boy i am\n'+
              '!points/!level -> See how much time you wasted in here..\n'+
            '!snipedist -> get the longest distance snipe in fortnite\n'+
          '!updateSnipeDist-> Update the longest snipe distance\n'+
        '!mostKills-> Get highest kill game for all modes in fortnite BR\n'+
      '!updateMostKills [solo|duo|squad] [numberOfKills] [names separated with spaces]-> Update highest kill games\n')
    break;
}


  //List of commands

  fs.writeFile("./context.json", JSON.stringify(currentContext), (err) => {
    if (err) console.error(err)
  });


});


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'general');
  if (!channel) return;
  channel.send(`ME BOT. ME GREET HUMAN: ${member}. HAVE GOOD TIME`);
  channel.send('(tipe !pet to pet the bot and show him who\'s a good boy)');
});

client.login(token);
