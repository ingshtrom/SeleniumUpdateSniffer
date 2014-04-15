// scraper.js
// Alex "Ingshtrom" Hokanson
// all thanks to http://blog.miguelgrinberg.com/post/easy-web-scraping-with-nodejs

var request     = require('request');
var cheerio     = require('cheerio');

// don't request the actual uri because the whole page is Javascript ><
var url = "http://selenium-release.storage.googleapis.com/?delimiter=/&prefix=";

console.log("requesting: " + url);
request(url, function(err, resp, body) {
  if (err) {
    console.log("Error requesting url: " + err);
  }
  console.log("loading into cheerio: " + body);
  $ = cheerio.load(body);
  var data = "";
  $("CommonPrefixes").each(function(index, value) {
    var valueWanted = value.children[0].children[0].data;
    valueWanted = valueWanted.substring(0, valueWanted.length - 1);
    console.info(valueWanted);
    if (index != 0) {
      data += ",";
    }
    data += valueWanted;
  });
  console.log("data: " + data);
});