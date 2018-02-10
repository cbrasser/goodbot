exports.run = (client, message, args) => {
    message.reply('I can do the following:\n' +
        '!pet -> Thank me for my services\n' +
        '!goodboyCount -> See how much of a good boy i am\n' +
        '!points/!level -> See how much time you wasted in here..\n' +
        '!maxSnipe -> get the longest distance snipe in fortnite\n' +
        '!insertSnipe [distance] [videoUrl]-> Insert a snipe of yours into the DB with link to the video\n' +
        '!mostKills-> Get highest kill game for all modes in fortnite BR\n' +
        '!insertWin [solo|duo|squad] [numberOfKills] [names separated with spaces]-> Insert a win of yours into the DB\n' +
        '!dbschema ->Get the schema of the db\n' +
        '!runsql [command] -> Make a query on the existing db (Only get queries)')
}