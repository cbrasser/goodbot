function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

exports.run = (client, message, args) => {
    const sql = require("sqlite");
    if (args.length > 1 && Number(args[0]) > 0 && isUrl(String(args[1]))) {
        sql.run("INSERT INTO snipes (distance,player, videoLink, guildId) VALUES (?, ?,?,?)", [Number(args[0]), message.author.username, String(args[1]),message.guild.id]).then(() => {
            message.reply('I inserted your snipe of ' + args[0] + ' meters - GG!')
        }).catch(() => {
            sql.run("CREATE TABLE IF NOT EXISTS snipe (distance INTEGER,player TEXT,videoLink TEXT, guildId TEXT)").then(() => {
                sql.run("INSERT INTO snipes (distance,player,videoLink, guildId) VALUES (?, ?, ?,?)", [args[0], message.author.username, args[1],message.guild.id]);
                message.reply('I inserted your snipe of ' + args[0] + ' meters - GG!')
            });
        });
    } else {
        message.reply('Invalid arguments, please use the following format: !insertSnipe [meters] [videoURL]')
    }
}