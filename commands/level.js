exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) return message.reply("You're level 0, start chatting to rank up!");
        message.reply(`Your level is ${row.level}`);
    });
}