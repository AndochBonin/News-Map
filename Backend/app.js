const express = require('express');
let request = require('request');
const news = require('gnews');
const app = express();
const port = 5000;

app.get("/", (req, res) => res.send("MY BACKEND"));
app.listen(port, () => console.log(`My backend listening on port${port}`))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get("/gnews", (req, res) => {
    const main = async () => {
        let query = req.query.region;
        const print = item => console.log(item.pubDate + ' | ' + item.title);
        let geo = await news.geo(query, {n : 4});
        //geo.forEach(print);
        geo = geo[0].title == "This feed is not available." ? await news.search(query, {n : 4}) : geo;
        console.log(geo[0].title);
        //console.log(geo[2].title)
        res.send([[geo[0].title, geo[1].title, geo[2].title, geo[3].title], [geo[0].link, geo[1].link, geo[2].link, geo[3].link]]);
    };
    main();
})
// to start run node app.js
//main();