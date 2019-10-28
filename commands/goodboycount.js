exports.run = (client, message, args) => {
    const sqlite3 = require("sqlite3");
  let db = new sqlite3.Database(
      './.db/data.db', (err) => {
        if (err) {
          console.error(err.message);
        }
      });
    db.get(`SELECT COUNT(petFrom) AS c FROM pets WHERE guildId= ?`,[message.guild.id], (err, row) => {
        if(err){
          console.log(err);
        }
        if (!row) {
            message.reply('NO ONE CALLED ME GOOD BOY YET =(')
        } else {
            message.reply('CALLED GOOD BOY ' + row.c + ' TIMES!');
        }
    });
  db.close();
}
