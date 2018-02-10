const sf = require('snekfetch')

async function getMeme(message, index) {
    //let res = await sf.get('https://www.reddit.com/u/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=500')
    let res = await sf.get('https://www.reddit.com/r/dankmemes/top/.json?sort=top&t=day&limit=500')
    const allPosts = res.body.data.children.filter(post => post.data.preview)
    const post = allPosts[index]
    await message.channel.send({
        embed: {
            title: post.data.title,
            url: post.data.url,
            image: {url: post.data.preview.images[0].source.url},
            description: post.data.url,
            footer: {text: `posted by ${post.data.author}`}
        }
    })


}

exports.run = async function (client, message, args) {
    const sql = require("sqlite");

    let memeIndex = 0;
    sql.get(`SELECT memeCount FROM botstats `).then(row => {
        if (!row) {
            sql.run("INSERT INTO botstats (memeCount) VALUES (?)", [0]);
        } else {
            memeIndex = row.memeCount;
            if (memeIndex > 50) {
                sql.run(`UPDATE botstats SET memeCount = 0`);
                getMeme(message, 0);
            } else {
                getMeme(message, memeIndex);
            }
            sql.run(`UPDATE botstats SET memeCount = ${row.memeCount + 1}`);
        }
    }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS botstats (pettage INTEGER, memeCount INTEGER)").then(() => {
            sql.run("INSERT INTO botstats (pettage, memeCount) VALUES (?,?)", [0, 0]);
            memeIndex = 0;
        });
    });
}