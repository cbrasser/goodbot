exports.run = (client, message, args) => {
    const https = require('https');
    let argument = args.join(' ');
    https.get('https://api.urbandictionary.com/v0/define?term=' + argument, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        resp.on('end', () => {
            let list = JSON.parse(data).list;
            // respond in a hooman friendly way
            let maxDefinitions = 3;
            for (let i = 0; i < list.length && i < maxDefinitions; i++) {
                let urbanDictionaryResponse = '';
                if (i === 0) {
                    urbanDictionaryResponse += 'HERE\'S WHAT I KNOW ABOUT ' + '[   ' + argument + '  ]:\n';
                }
                else {
                    urbanDictionaryResponse += '\nOR:\n';
                }
                urbanDictionaryResponse += 'DEFINITION:\n' + list[i].definition + '\n\nEXAMPLE:\n' + list[i].example + '\n\n';
                message.reply(urbanDictionaryResponse);
            }
        });
    });
}