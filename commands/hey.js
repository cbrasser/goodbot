exports.run = async (client, message, args) => {
    let commandFile = require(`../utility/voicecommand.js`);
    commandFile.run(client, message, 'https://cdn.glitch.com/efd22f02-6874-4da1-985f-d230019dfe47%2Fcarlos.mp3?1528310624823', false);
}

module.exports.help = {
    name: "hey"
}