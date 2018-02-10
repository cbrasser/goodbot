exports.run = (client, message, args) => {
    const sql = require("sqlite");
    if (args.length > 0) {
        let query = '';
        for (let i = 0; i < args.length; i++) {
            query += args[i] + ' ';
        }
        console.log(query)
        sql.all(query).then(rows => {
            if (!rows) {
                message.reply('No result for your query')
            } else {
                rows.forEach(function (row) {
                    message.reply(JSON.stringify(row))
                });
            }
        }).catch(() => {
            console.error;
            message.reply('Not a valid sql query!')
        })
    }
}