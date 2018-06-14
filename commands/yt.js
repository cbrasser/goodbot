exports.run = async (client, message, args) => {
	if(!args[0]){
		message.reply("Please provide a youtube link");
	}
    let commandFile = require(`../utility/voicecommand.js`);
    commandFile.run(client, message, args[0], true);
}

module.exports.help = {
    name: "Play audio of a youtube video in your current voice channel"
}