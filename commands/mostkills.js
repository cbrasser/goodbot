exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.all(`SELECT mode, MAX(kills) as k,players FROM wins WHERE guildId="${message.guild.id}" GROUP BY mode`).then(rows => {
        if (!rows) {
            message.reply('nothing found');
        } else {
            if (rows.length == 0) {
                message.reply('No wins recorded yet!')
            }
            rows.forEach(function (row) {
                message.reply('Most Kills in ' + row.mode + ' is ' + row.k + ', done by ' + row.players)
            });
        }
    }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT, guildId TEXT)").then(() => {
            message.reply('No wins recorded yet!')
        });
    });
}