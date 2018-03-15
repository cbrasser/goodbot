exports.run = (client, message) => {
    const sql = require("sqlite");
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}" AND guildId = "${message.guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO scores (userId, points, level, guildId) VALUES (?, ?, ?, ?)", [message.author.id, 1, 0, message.guild.id]);
        } else {
            let curLevel = Math.floor(0.7 * Math.sqrt(row.points + 1));
            if (curLevel > row.level) {
                message.reply(`You've leveled up to level **${curLevel}**! You're a good boye!`);
            }
            sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${curLevel} WHERE userId = "${message.author.id}" AND guildId = "${message.guild.id}" `).then(() => {
            });

        }
    }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER, guildId TEXT)").then(() => {
            sql.run("INSERT INTO scores (userId, points, level, guildId) VALUES (?, ?, ?, ?)", [message.author.id, 1, 0, message.guild.id]);
        });
    });
}