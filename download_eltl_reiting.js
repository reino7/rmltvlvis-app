// Imports and requires
const https = require('https');
const fs = require('fs');
const path = require('path');
const { get } = require('http');
const moment = require('moment');
const xml2js = require('xml2js');
const dbConfig = require('./config/db.config.js');



const fileURL = 'https://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php';


function downloadFile(url, callback) {

  const filename = path.basename(url);

  const req = https.get(url, function (res) {

    // This opens up the writeable stream
    const fileStream = fs.createWriteStream(filename);
    res.pipe(fileStream);
    console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' ' + filename + ' download started');

    // If an error occurs, then show it
    fileStream.on('error', function (err) {
      console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' Error writing to the stream');
      console.log(err);
    });

    fileStream.on('close', function () {
      callback(filename);
    });

    fileStream.on('finish', function () {
      fileStream.close();
      console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' ' + filename + ' download finished');
    });
  });

  // If an error occurs on downloading, then show it
  req.on('error', function (err) {
    console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' Error downloading');
    console.log(err);
  });

}


// Call file downloading function
downloadFile(fileURL, function (fn) {

  var parser = new xml2js.Parser();
  fs.readFile(__dirname + '/app_eltlid_reitinguga_xml.php', function (err, data) {
    parser.parseString(data, function (err, result) {
      console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' Reading content of ' + fn + ' started');
      // console.dir(result.PERSONS.PERSON);
      let resultsPersons = result.PERSONS.PERSON;

      for (let i = 0; i < resultsPersons.length; i++) {
        const element = resultsPersons[i];
        // console.log(element);
      }

      console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' Reading content of ' + fn + ' finished');
    });
  });

})



