exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get(`SELECT * FROM clips
            WHERE guildId = "${message.guild.id}"
            ORDER BY RANDOM()
            LIMIT 1 `).then(row => {
        if (!row) {
            message.reply('nothing found');
        } else {
            message.reply('Clip by: ' + row.player + '. Link:' + row.videoLink);
        }
    }).catch(error => {
        console.log(error);
        sql.run("CREATE TABLE IF NOT EXISTS clips (distance INTEGER,player TEXT, videoLink TEXT, guildId TEXT)").then( () => {
            message.reply('No clips recorded yet!')
        });

    });
}