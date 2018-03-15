exports.run = (client, message, args) => {
    const sql = require("sqlite");
    sql.get(`SELECT pettage FROM botstats WHERE guildId="${message.guild.id}"`).then(row => {
        if (!row) {
            message.reply('NO ONE CALLED ME GOOD BOY YET =(')
        } else {
            message.reply('CALLED GOOD BOY ' + row.pettage + ' TIMES!');
        }
    }).catch(() => {
        message.reply('NO ONE CALLED ME GOOD BOY YET =(')
    });
}