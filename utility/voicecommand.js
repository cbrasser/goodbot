const Discord = require("discord.js");
const fs = require("fs");

exports.run = async(client, message, fileurl, isYtVid) => {
  // check if sender is in a voice channel
  if (!message.member.voiceChannel) {
    return message.reply('join a voice channel fam')
  }
  var channel = message.member.voiceChannel;
  var perms = channel.permissionsFor(client.user);

  // check if bot has according permissions in the voice channel
  if (!perms.has('CONNECT') || !perms.has('SPEAK') || !perms.has('USE_VAD')) {
    console.log('asdfasf');
    return message.reply(
        'Make sure I have `connect`, `speak`, and `use voice activity` permissions in the channel settings so I can do this command!\n\nHow to do that: https://i.imgur.com/ugplJJO.gif')
  }
  channel.join()
      .then(connection =>
                         {
                           const streamOptions = {seek : 0, volume : 0.4};
                           var dispatcher;
                           if(isYtVid){
                              const ytdl = require('ytdl-core');
                              const stream = ytdl(fileurl, { filter : 'audioonly' });
                              dispatcher = conn.playStream(stream, streamOptions);
                          } else {
                               dispatcher = connection.playArbitraryInput(
                               fileurl, streamOptions);
                          }
                           if(!dispatcher){
                              console.log("did not get a dispatcher");
                             channel.leaver();
                           }
                           dispatcher.on(
                               "end", end => {
                                 channel.leave();
                               });
                         })
      .catch(err => console.log(err));

}
