function getLevel(p) {
  return Math.floor(0.7 * Math.sqrt(p + 1));
}

exports.run = (client, message) => {
  const sqlite3 = require("sqlite3");
  let db = new sqlite3.Database(
      './.db/data.db', (err) => {
        if (err) {
          console.error(err.message);
        }
      });
  db.run(
      "CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, guildId TEXT)",
      function(error) {
        if (error) {
          console.log(`Error creating table : ${error}`);
        }
      });

  // see if there is an entry for user
    let points =1;
    db.get(`SELECT * FROM scores WHERE userId = ? AND guildId = ? `, [message.author.id, message.guild.id], function (err, row) {
      if (err) {
        console.log(err);
      }
      if (!row) {
        db.run("INSERT INTO scores (userId, points guildId) VALUES (?, ?, ?)", [message.author.id, 0, message.guild.id]);
      } else {
        db.run(`UPDATE scores SET points = ? WHERE userId = ? AND guildId = ? `,[row.points+1, message.author.id, message.guild.id], function(err) {
            if (err) {
              console.log(err);
            }
        });

        // We found an entry, calculate new points/level and update db
        points = row.points +1;
        let curLevel = getLevel(points);
        if (curLevel > getLevel(row.points)) {
          message.reply(`You 've leveled up to level **${curLevel}**! You' re a
                good boye !`);
        }
      }
    });
   db.close();
}

