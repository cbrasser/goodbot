exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get(`SELECT pettage FROM botstats `).then(row => {
        if (!row) {
            sql.run("INSERT INTO botstats (pettage) VALUES (?)", [1]);
        } else {
            sql.run(`UPDATE botstats SET pettage = ${row.pettage + 1}`);
        }
    }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS botstats (pettage INTEGER)").then(() => {
            sql.run("INSERT INTO botstats (pettage) VALUES (?)", [1]);
        });
    });
    message.reply('THANK YOU HOOMAN =)');
}