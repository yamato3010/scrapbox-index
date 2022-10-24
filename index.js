var express = require('express');
var app = express();
let fs = require('fs');
var client = require('cheerio-httpcli');
var RSS = "https://scrapbox.io/api/feed/yamato3010";


app.get('/', function (request, response) {
    response.send('Hello World!')
});

app.get('/sitemap.xml', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(fs.readFileSync(require('path').resolve(__dirname, './sitemap.xml'), "utf8"));
});

app.get("/scrapbox/:title", (req, res) => {
    console.log(req.params.title);
    // URLからscrapboxのタイトルを取得
    const title = req.params.title;
    // scrapboxにリダイレクト
    res.redirect(301, `https://scrapbox.io/yamato3010/${encodeURIComponent(title)}`);
});

app.listen(PORT=process.env.PORT || 3000, function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});

function genSitemap() {
    var RSSArr = [];
    var map = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"
    client.fetch(RSS, {})
        .then(function (result) {
            if (result.error) { console.log("error"); return; }
            result.$("item").each(function (idx) {
                title = result.$(this).children("title").text();
                address = result.$(this).children("link").text();
                // console.log(title);
                // console.log(address);
                var key = result.$(this).children("link").text();
                var keyArr = key.split("/");
                var url = "<url><loc>https://fast-castle-61290.herokuapp.com/scrapbox/" + keyArr[4]+"</loc></url>";
                var tmp = {
                    [url]: {
                        lastmod: '2018-04-01',
                        changefreq: 'always',
                        priority: 1.0,
                    }
                }
                RSSArr.push(tmp);
                map = map + url;
            });
            map = map + "<url><loc>https://fast-castle-61290.herokuapp.com/</loc></url><url><loc>https://fast-castle-61290.herokuapp.com/sitemap.xml</loc></url><url><loc>https://fast-castle-61290.herokuapp.com/scrapbox/:title</loc></url></urlset>"
            console.log(map);
            fs.writeFile("sitemap.xml", map, (err) => {
                if (err) throw err;
                console.log('正常に書き込みが完了しました');
            });
        })
        return(map);
};

genSitemap();

// var feed = getFeed();
// console.log(feed);
// const sitemap = map(feed).toFile();

// async function getFeed() {
//     var RSSArr = [];
//     var mapArr = [];
//     await client.fetch(RSS, {})
//         .then(function (result) {
//             if (result.error) { console.log("error"); return; }
//             result.$("item").each(function (idx) {
//                 title = result.$(this).children("title").text();
//                 address = result.$(this).children("link").text();
//                 // console.log(title);
//                 // console.log(address);
//                 var key = result.$(this).children("link").text();
//                 var keyArr = key.split("/");
//                 var url = "/scrapbox/" + keyArr[4]
//                 var tmp = {
//                     [url]: {
//                         lastmod: '2018-04-01',
//                         changefreq: 'always',
//                         priority: 1.0,
//                     }
//                 }
//                 var tmp2 = {
//                     [url]:['get']
//                 }
//                 // let tmp = {
//                 //     title: result.$(this).children("title").text(),
//                 //     description: result.$(this).children("description").text(),
//                 //     id: result.$(this).children("link").text(),
//                 //     link: result.$(this).children("link").text(),
//                 //     content: result.$(this).children("content").text(),
//                 //     date: result.$(this).children("pubDate").text(),
//                 // }
//                 RSSArr.push(tmp);
//                 mapArr.push(tmp2);
//             });
//             console.log("\n" + "scrapboxからのフィードを取得しました");
//         })
//         let result = {
//             http: 'https',
//             url: 'fast-castle-61290.herokuapp.com',
//             generate: app,
//             route:RSSArr
//         }
//         const sitemap = map({
//             http: 'https',
//             url: 'fast-castle-61290.herokuapp.com',
//             map:mapArr,
//             generate: app,
//             route:RSSArr
//         }).toFile();


//         return(result);
// };