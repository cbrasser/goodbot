exports.run = (client, message, args) => {
	const yes = [
	'affirmative',
	'amen',
	'yes',
	'yessir',
	'true',
	'aye',
	'yeah',
	'absolutely',
	'woof',
	'arrf',
	'defenitely',
	'certainly',
	'beyoned a doubt',
	'yep',
	'of course',
	];
	const no = [
	'nah',
	'no',
	'never',
	'not at all',
	'nay',
	'woof',
	'nope',
	'negative',
	'its a no'
	];
    if(args.length<1 || !args[args.length-1].endsWith('?')){
        message.reply("Please ask a propper question, arf");
        return;
    }
    if(args[0].startsWith('who') || args[0].startsWith('Who')){
    		message.channel.send(message.guild.members.random().user.username);
    		return;
    	}
    message.channel.send(Math.random()>=0.5 ? yes[Math.floor(Math.random()*yes.length)] : no[Math.floor(Math.random()*no.length)] )



   
}