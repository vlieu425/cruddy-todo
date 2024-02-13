const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // call readCounter((err, ) => {
    // handle the error somehow,
    // pass the error into the callback.
  readCounter((err, counter) => {
    if (err) {
      console.error('Here\'s the error: ', err);
      return;
    }
    // update the count
    // newCounter = counter + 1;   // check here if we need to update existing, OR store counter + 1 in new variable.
    let newCount = counter + 1;
    // call writeCounter(newCounter, err, callback)
    writeCounter(newCount, (err) => {
      if (err) {
        // handle the error
        console.error('Here\'s the error: ', err);
        return;
      }
      // somehow return the newest counter...
      // return newCount;
      callback(null, zeroPaddedNumber(newCount));
    });
  });
// })
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
