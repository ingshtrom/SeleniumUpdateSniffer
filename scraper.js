// scraper.js
// Alex "Ingshtrom" Hokanson
// http://www.github.com/ingshtrom
// thanks to http://blog.miguelgrinberg.com/post/easy-web-scraping-with-nodejs

var request     = require("request");
var cheerio     = require("cheerio");
var fs          = require("fs")
var _           = require("underscore");
var mailer      = require("nodemailer");
var config      = require("./config");

// don't request the actual uri because the whole page is Javascript ><
var url = config.general.url;
var file = config.general.file;

var transport = mailer.createTransport(config.mail.transportType, config.mail.transportOptions);

var message = {
  from: config.mail.from,
  to: config.mail.to.join(","),
  subject: config.mail.subject,
  text: config.mail.bodyText,
  html: config.mail.bodyHtml
};

console.log("START");
console.log("requesting: " + url);
request(url, function(err, resp, body) {
  if (err) {
    console.error("Error requesting url: " + err);
  }
  $ = cheerio.load(body);
  var data = [];
  $("CommonPrefixes").each(function(index, value) {
    var valueWanted = value.children[0].children[0].data;
    valueWanted = valueWanted.substring(0, valueWanted.length - 1);
    if (valueWanted !== "icons") {
      data.push(valueWanted);
    }
  });
  console.log("");
  console.log("reading from " + file);
  var fileContent = "[]";
  if (fs.existsSync(file)) {
    fileContent = fs.readFileSync(file);
  } else {
    console.log("no file. Defaulting to empty array as data.");
  }
  var fileData = JSON.parse(fileContent);
  var uniqueData = _.difference(data, fileData);
  console.log("");
  console.log("data........." + data);
  console.log("fileData....." + fileData);
  console.log("uniqueData..." + uniqueData);
  if (uniqueData.length > 0) {
    // this means that there is a difference and a new version!
    console.log("!!!!NEW VERSION!!!!");
    console.log(uniqueData[0] + " is the new version of Selenium!");
    console.log("!!!!!!!!!!!!!!!!!!!");
    // send an email notfiying me of a new version
    // as-per: https://github.com/andris9/Nodemailer/blob/master/examples/example_direct.js
    message.text = "New Selenium version: " + uniqueData[0];
    message.html = "<b>" + message.text + "</b>";

    transport.sendMail(message, function(error, response){
      if (error) {
        console.error('Error occured while sending email.');
        console.info(error);
        console.info("message: (next trace)");
        console.info(message);
        console.log("");
        console.log("DONE");
        return;
      } else {
        console.log('Message sent successfully!');
        console.log(response);
        console.log("");
        console.log("saving file " + file);
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
        var dataToSave = JSON.stringify(data);
        fs.writeFileSync(file, dataToSave);
        console.log("");
        console.log("DONE");
        return;
      }
      return;
    });
    return;
  }
});

return;