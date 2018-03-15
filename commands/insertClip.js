function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

exports.run = (client, message, args) => {
    const sql = require("sqlite");
    if (args.length > 0 && isUrl(String(args[0]))) {
        sql.run("INSERT INTO clips (player, videoLink) VALUES (?,?)", [message.author.username, String(args[0])]).then(() => {
            message.reply('I inserted your highlight clip- GG!')
        }).catch(() => {
            sql.run("CREATE TABLE IF NOT EXISTS clips (player TEXT,videoLink TEXT)").then(() => {
                sql.run("INSERT INTO snipes (player,videoLink) VALUES (?, ?)", [message.author.username, args[0]]);
                message.reply('I inserted your highlight clip - GG!')
            });
        });
    } else {
        message.reply('Invalid arguments, please use the following format: !insertClip [videoURL]')
    }
}