// Imports and requires
const https = require('https');
const fs = require('fs');
const path = require('path');
const { get } = require('http');
const moment = require('moment');

// const fileURL = 'https://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php'; 
const fileURL = 'https://speed.hetzner.de/100MB.bin'; 

function downloadFile(url, callback) {

  const filename = path.basename(url);

  const req = https.get(url, function (res) {

    // This opens up the writeable stream
    const fileStream = fs.createWriteStream(filename);
    res.pipe(fileStream);
    console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' Download started');

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
      console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' Download finished');
    });
  });

  req.on('error', function (err) {
    console.log(moment().format('YYYY.MM.DD hh:mm:ss') + ' Error downloading the file');
    console.log(err);
  });

}

// Call file downloading function
downloadFile(fileURL, function(fn) {
  console.log(fn);
})