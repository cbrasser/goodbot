exports.run = async (client, message, args) => {
    let commandFile = require(`../utility/voicecommand.js`);
    let file = Math.floor(Math.random()*3)+1;
    console.log(file)
    commandFile.run(client, message, `files/audio/todd${file}.mp3`, false);
}

module.exports.help = {
    name: "sad"
}
