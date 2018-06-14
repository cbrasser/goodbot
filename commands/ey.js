exports.run = async (client, message, args) => {
    let commandFile = require(`../utility/voicecommand.js`);
    commandFile.run(client, message, 'https://cdn.glitch.com/efd22f02-6874-4da1-985f-d230019dfe47%2Fey.mp3?1528312098787', false);
}

module.exports.help = {
    name: "idubbz approves"
}