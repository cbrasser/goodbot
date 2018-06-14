exports.run = (client, message, args) => {
    if(args.length<1 || !args[args.length-1].endsWith('?')){
        message.reply("Please ask a propper question, arf");
        return;
    }


}