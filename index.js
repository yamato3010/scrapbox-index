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

app.use(express.static('public'));

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
                var lastMod = result.$(this).children("pubDate").text();
                var url = "<url><loc>https://yamato-scrapbox.herokuapp.com/scrapbox/" + keyArr[4]+"</loc><lastmod>" + lastMod + "</lastmod></url>";
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
            map = map + "<url><loc>https://yamato-scrapbox.herokuapp.com/</loc></url><url><loc>https://yamato-scrapbox.herokuapp.com/sitemap.xml</loc></url><url><loc>https://yamato-scrapbox.herokuapp.com/scrapbox/:title</loc></url></urlset>"
            console.log(map);
            fs.writeFile("sitemap.xml", map, (err) => {
                if (err) throw err;
                console.log('正常に書き込みが完了しました');
            });
        })
        return(map);
};

genSitemap();