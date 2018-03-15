exports.run = (client, message, args) => {
    message.reply('the DB has the following tables:\n' +
        'snipes(distance, Player, videoLink)\n' +
        'botstats(pettage, memeCount)\n' +
        'wins(mode, kills, players)\n'+
        'clips(player, videoLink)')
}