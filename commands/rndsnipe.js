exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get(`SELECT * FROM snipes
            WHERE guildId = "${message.guild.id}"
            ORDER BY RANDOM()
            LIMIT 1 `).then(row => {
        if (!row) {
            message.reply('nothing found');
        } else {
            message.reply(row.distance+'m Snipe by: ' + row.player + '. Link:' + row.videoLink);
        }
    }).catch(error => {
        console.log(error);
        sql.run("CREATE TABLE IF NOT EXISTS snipes (distance INTEGER,player TEXT, videoLink TEXT, guildId TEXT)").then( () => {
          message.reply('No snipes recorded yet!')
        });

    });
}