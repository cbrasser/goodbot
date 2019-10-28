exports.run = (client, message, args) => {
  const sqlite3 = require("sqlite3");
  let db = new sqlite3.Database(
      './.db/data.db', (err) => {
        if (err) {
          console.error(err.message);
        }
      });
  db.run("CREATE TABLE IF NOT EXISTS pets (petFrom TEXT, guildId TEXT)", function(error){
    if(error){ console.log("Error creating table: "+error);}
  });
  db.run("INSERT INTO pets (petFrom, guildId) VALUES (?, ?)",
    [ message.author.id, message.guild.id ], function(err) {
      if (err){
        console.log(err);
      }
    });
  db.close();
  message.reply('THANK YOU HOOMAN =)');
}
