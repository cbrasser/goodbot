exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}" AND guildId="${message.guild.id}"`).then(row => {
        if (!row) return message.reply("sadly you do not have any points yet on this server!");
        message.reply(`you have ${row.points} Internet points, way to go!`);
    });
}
