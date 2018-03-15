exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get(`SELECT pettage FROM botstats WHERE guildId="${message.guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO botstats (pettage, guildId) VALUES (?, ?)", [1,message.guild.id]);
        } else {
            sql.run(`UPDATE botstats SET pettage = ${row.pettage + 1} WHERE guildId="${message.guild.id}"`);
        }
    }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS botstats (pettage INTEGER, memeCount INTEGER, guildId TEXT)").then(() => {
            sql.run("INSERT INTO botstats (pettage, memeCount, guildId) VALUES (?,?,?)", [1,0,message.guild.id]);
        });
    });
    message.reply('THANK YOU HOOMAN =)');
}