function isUser(client, s) {
    return Array.from(client.users.values()).includes(s);

}

exports.run = (client, message, args) => {
    const sql = require("sqlite");
    let insults = [];
    if (args.length > 0 && isUser(client, String(args[0]))) {
        sql.all("SELECT * FROM insults").then(rows => {
            if (!rows) {
                message.reply('No insults in DB')
            } else {
                rows.forEach(function (row) {
                    insults.add(row.text)
                });
                }
        }).catch(() => {
            sql.run("CREATE TABLE IF NOT EXISTS insults (text TEXT)").then(() => {
                sql.run("INSERT INTO insults (text) VALUES (?)", ["You're not a good boye"]).then(() =>{
                    insults.add("You're not a good boye");
                });
            });
        });
    } else {
        message.reply('Invalid arguments, please use the following format: !insult [user]')
    }
    let random = Math.floor(Math.random()*insults.length);
        message.channel.send(insults[random]+" @"+args[0]);
}