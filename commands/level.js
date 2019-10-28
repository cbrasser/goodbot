exports.run = (client, message, args) => {
const sqlite3 = require("sqlite3");
  let db = new sqlite3.Database(
      './.db/data.db', (err) => {
        if (err) {
          console.error(err.message);
        }
      });
 db.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, guildId TEXT)", function(error){
    if(error){ console.log("Error creating table: "+error);}
  });
    db.get(`SELECT * FROM scores WHERE userId = ? AND guildId = ? `, [message.author.id, message.guild.id], function (err, row) {
      if (err){ console.log(err); }
      if (row){
        message.reply(`Your score is ${row.points}`);
      } else {
        // No entry yet for user
        db.run("INSERT INTO scores (userId, points, guildId) values(?,?,?)", [message.author.id, 1, message.guild.id], function (err) {
          if (err){ console.log(err);}
          message.reply("Your score is 1");
        });
      }
      
    });
  db.close();
}
