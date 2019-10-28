exports.run = async (client, message, args) => {
    let commandFile = require(`../utility/voicecommand.js`);
    commandFile.run(client, message, 'files/audio/sad.mp3', false);
}

module.exports.help = {
    name: "need"
}


