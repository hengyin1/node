// const http = require('http');
const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');
const EventProxy = require('eventproxy');
var async = require("async");
const url = require("url");

const app = express();
// const hostname = '127.0.0.1';
const port = 3000;
const baseUrl = "https://cnodejs.org/";

app.get('/', (req, res) => {
    superagent.get(baseUrl).end((err, sres) => {
        if (err) {
            
        }
        const $ = cheerio.load(sres.text);
        let topicUrls = [];
        $("#topic_list .topic_title").each((idx, element) => {
            const $element = $(element);
            topicUrls.push(url.resolve(baseUrl, $element.attr("href")));
        });

        let couter = 1;
        topicUrls = topicUrls.slice(0, 6);
        console.log(topicUrls.length);
        const fetchUrl = function (url) {
            console.log(url);
            return new Promise((resolve, reject) => {
                superagent.get(url).end((err, res) => {
                    if (err) reject();
                    console.log(couter++);
                    console.log("-------------------");
                    resolve(res.text);
                });
            });
        };

        async.mapLimit(topicUrls, 3, async function (url) {
            const response = await fetchUrl(url);
            return [url, response];
        }, (err, topics) => {
            if (err) {
                
            }
            const datas = topics.map(topic => {
                const topicUrl = topic[0];
                const topicHtml = topic[1];
                const $ = cheerio.load(topicHtml);
                return {
                    title: $(".topic_full_title").text(),
                    href: topicUrl,
                    comment1: $(".reply_content").eq(0).text(),
                };
            });

            res.send(datas);
        });
        
        

        // const ep = new EventProxy();
        // ep.after("topic_html", topicUrls.length, (topics) => {
        //     const datas = topics.map(topic => {
        //         const topicUrl = topic[0];
        //         const topicHtml = topic[1];
        //         const $ = cheerio.load(topicHtml);
        //         return {
        //             title: $(".topic_full_title").text(),
        //             href: topicUrl,
        //             comment1: $(".reply_content").eq(0).text(),
        //         };
        //     });

        //     res.send(datas);
        // });
        // topicUrls.forEach(topicUrl => {
        //     superagent.get(topicUrl).end((err, res) => {
        //         ep.emit("topic_html", [topicUrl, res.text]);
        //     });
        // });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// const serve = http.createServer((req, res, next) => {
//     superagent.get("https://cnodejs.org/").end((err, sres) => {
//         if (err) {
//             next(err);
//         }
//         const $ = cheerio.load(sres.text);
//         const items = [];
//         $("#topic_list .topic_title").each((idx, element) => {
//             const $element = $(element);
//             items.push({
//                 title: $element.attr("title"),
//                 href: $element.attr("href"),
//             });
//         });
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end("hell0");
//     })
// });

// serve.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// })