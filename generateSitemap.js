var client = require('cheerio-httpcli');
var RSS = "https://scrapbox.io/api/feed/yamato3010";
let fs = require('fs');

function genSitemap() {
    var RSSArr = [];
    var map = "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">"
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
                var lastModDate = new Date(lastMod);
                console.log(lastModDate);
                var y = lastModDate.getFullYear();
                var m = ('00' + (lastModDate.getMonth()+1)).slice(-2);
                var d = ('00' + lastModDate.getDate()).slice(-2);
                var url = "<url><loc>https://yamato-scrapbox.herokuapp.com/scrapbox/" + keyArr[4]+"</loc><lastmod>" + y + '-' + m + '-' + d + "</lastmod></url>";

                // var url = "<url><loc>https://fast-castle-61290.herokuapp.com/scrapbox/" + keyArr[4]+"</loc><lastmod>" + lastMod + "</lastmod></url>";
                var tmp = {
                    [url]: {
                        lastmod: '2018-04-01',
                        changefreq: 'always',
                        priority: 1.0,
                    }
                }
                console.log(lastMod);
                RSSArr.push(tmp);
                map = map + url;
            });
            map = map + "<url><loc>https://fast-castle-61290.herokuapp.com/</loc></url><url><loc>https://fast-castle-61290.herokuapp.com/sitemap.xml</loc></url><url><loc>https://fast-castle-61290.herokuapp.com/scrapbox/:title</loc></url></urlset>"
            // console.log(map);
            fs.writeFile("sitemap.xml", map, (err) => {
                if (err) throw err;
                console.log('正常に書き込みが完了しました');
            });
        })
        return(map);
};

genSitemap();