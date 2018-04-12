exports.run = (client, message, args) => {
    if(args.length>0){
        let sentence = args.join(' ');
        message.channel.send(sentence, { tts: true })
    }else {
        message.channel.send('You gotta give me some text, woof', { tts: true })
    }

}