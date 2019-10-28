exports.run = async (client, message, args) => {
    let commandFile = require(`../utility/voicecommand.js`);
    commandFile.run(client, message, 'files/audio/work.mp3', false);
}

module.exports.help = {
    name: "how much of the work was done?"
}
