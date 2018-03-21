exports.run = (client, message, args) => {
    message.channel.send({embed: {
            color: 3447003,
            author: {
                name: 'GoodBot',
                icon_url: client.user.avatarURL
            },
            title: "commands",
            description: "Everything I can do =)",
            fields: [{
                name: "!pet",
                value: "Thank me for my services"
            },
                {
                    name: "!goodboyCount",
                    value: "See how much of a good boy i am"
                },
                {
                    name: "!points/!level",
                    value: "See how much time you wasted in here.."
                },
                {
                    name: "!insertSnipe [distance] [videoUrl]",
                    value: "Insert a snipe of yours into the DB with link to the video"
                },
                {
                    name: "!maxSnipe",
                    value: "get the longest distance snipe in fortnite"
                },
                {
                    name: "!mostKills",
                    value: "Get highest kill game for all modes in fortnite BR"
                },
                {
                    name: "!insertWin [solo|duo|squad] [numberOfKills] [names separated with spaces]",
                    value: "Insert a win of yours into the DB"
                },
                {
                    name: "!dbschema",
                    value: "get the schema of the db"
                },
                {
                    name: "!query [SQL query]",
                    value: "Make a query on the existing db (Only get queries)"
                },
                {
                    name: "!shrek",
                    value: "No comment needed"
                },
                {
                    name: "!ud [search term]",
                    value: "Get hit with some straight FACCTs"
                },
                {
                    name: "!insertClip [video URL]",
                    value: "Store highlight clip in the DB"
                },
                {
                    name: "!brstats [platform] [fortnite username]",
                    value: "Git gud"
                },
                {
                    name: "!gif [tag]",
                    value: "Random Giph with specified tag (can be left out)"
                },
                {
                    name: "!sticker [tag]",
                    value: "Random Sticker with specified tag (can be left out)"
                }
            ],
            timestamp: new Date(),

        }
    });
    //message.reply(answer);
}