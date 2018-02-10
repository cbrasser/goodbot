exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) return message.reply("sadly you do not have any points yet!");
        message.reply(`you have ${row.points} Internet points, way to go!`);
    }).catch(()=>{
        message.reply('No points recored for you yet, this should not happen, talk to an admin!')
    });
}
