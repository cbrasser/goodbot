exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get("SELECT MAX(distance) as d, player, videoLink FROM snipes").then(row => {
        if (!row) {
            message.reply('nothing found');
        } else {
            message.reply('Longest snipe recorded is ' + row.d + ', done by ' + row.player + '. Link:' + row.videoLink);
        }
    }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS snipes (distance INTEGER,player TEXT, videoLink TEXT)");
        message.reply('No snipes recorded yet!')
    });


}