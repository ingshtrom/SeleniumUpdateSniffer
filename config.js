// config.js
// Alex "Ingshtrom" Hokanson
// http://www.github.com/ingshtrom

// configuration of email sending
exports.mail = {
  // to - array of emails to send the notification email to
  to: [
    "me@foobar.com"
  ],

  // from - arbitrary email that is displayed as the from
  from: "SeleniumVersionDiff <info@foobar.com>",

  // subject - the subject of the email notification
  subject: "New Selenium Version Here Now!",

  // bodyText - the default body in plain text
  // this gets updated once we know the actual version of the newly released Selenium stuff
  bodyText: "the text didn't get updated... sorry",

  // bodyHtml - the default body in HTML
  // this gets updated once we know the actual version of the newly released Selenium stuff
  bodyHtml: "<b>the text didn't get updated... sorry</b>",

  // transportType - the type of transport to use for mail
  // default to using SMTP
  // see http://www.nodemailer.com/ for more information
  transportType: "SMTP",

  // transportOptions - the options object passed as the second parameter to
  //    nodemailer.createTransport()
  // this defaults to using SMTP through a Gmail account
  // see http://www.nodemailer.com/ for more information
  transportOptions: {
    service: "Gmail",
    auth: {
      user: "foobar@gmail.com",
      pass: "foobar"
    }
  }
};

// general configuration
exports.general = {
  // url - the url to scrape
  url: "http://selenium-release.storage.googleapis.com/?delimiter=/&prefix=",

  // file - the file to save settings to
  // you may want to edit this so that it is Unix or Windows specific
  file: "last_version_check.txt"
}