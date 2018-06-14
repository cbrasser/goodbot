exports.run = async (client, message, args) => {
    let commandFile = require(`../utility/voicecommand.js`);
    commandFile.run(client, message, 'https://cdn.glitch.com/efd22f02-6874-4da1-985f-d230019dfe47%2FBitconnect%20Annual%20Ceremony%20High%20Lights%20(%20Carlos%20Matos%20from%20N.Y.%20)%20(1).mp3?1528743964064');
}

module.exports.help = {
    name: "The world has changed..."
}