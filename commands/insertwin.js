exports.run = (client, message, args) => {
    const sql = require("sqlite");
    switch (args[0]) {
        case 'solo':
            if (Number(args[1]) && args.length > 2) {
                sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], args[2]]).then(() => {
                    message.reply('I saved your win - GG!')
                }).catch(() => {
                    sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT)").then(() => {
                        sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], args[2]]).then(()=>{
                            message.reply('I saved your win - GG!')
                        });
                    });

                });
            } else {
                message.reply('Incorrect argument format, check !commands for instructions!')
            }
            break;
        case 'duo':
            if (Number(args[1]) && args.length > 2 && args.length < 5) {
                let names = '';
                for (let i = 2; i < args.length; i++) {
                    names += args[i] + ', ';
                }
                sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], names]).then(() => {
                    message.reply('I saved your win - GG!')
                }).catch(() => {
                    sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT)").then(() => {
                        sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], names]).then(()=>{
                            message.reply('I saved your win - GG!')
                        });
                    });
                });

            } else {
                message.reply('Incorrect argument format, check !commands for instructions!')
            }
            break;
        case 'squad':
            if (Number(args[1]) && args.length > 2 && args.length < 7) {
                let names = '';
                for (let i = 2; i < args.length; i++) {
                    names += args[i] + ', ';
                }
                sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], names]).then(() => {
                    message.reply('I saved your win - GG!')
                }).catch(() => {
                    sql.run("CREATE TABLE IF NOT EXISTS wins (mode TEXT, kills INTEGER, players TEXT)").then(() => {
                        sql.run("INSERT INTO wins (mode, kills, players) VALUES (?, ?, ?)", [args[0], args[1], names]).then(()=>{
                            message.reply('I saved your win - GG!')
                        });
                    });
                });
            } else {
                message.reply('Incorrect argument format, check !commands for instructions!')
            }
            break;
        default:
            message.reply('Incorrect argument format, check !commands for instructions!')
    }
}