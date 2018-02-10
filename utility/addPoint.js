exports.run = (client, message) => {
    const sql = require("sqlite");
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        } else {
            let curLevel = Math.floor(0.7 * Math.sqrt(row.points + 1));
            if (curLevel > row.level) {
                message.reply(`You've leveled up to level **${curLevel}**! You're a good boye!`);
            }
            sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${curLevel} WHERE userId = "${message.author.id}"`).then(() => {
            });

        }
    }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
            sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        });
    });
}