const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {

    if (err) {
      console.error('There was an error: ', err);
    }
    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, ()=> {
      if (err) {
        console.error('error here: ', err);
      }
      callback(null, {id, text });
    });
  });
};

exports.readAll = (callback) => {

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.error('error: ', err);
    } else {
      if (files.length === 0) {
        console.log('testing test');
        callback(null, files);
      } else {
        const allData = files.map((file) => {
          const fileName = path.parse(file).name;
          console.log('file name: ', fileName);
          return {'id': fileName, 'text': fileName};
        });
        callback(null, allData);
      }
    }
  });
};

exports.readOne = (id, callback) => {

  fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err, text)=> {
    if (err) {
      console.error('ReadOne Error: ', err);
      callback(err);
    } else {
      callback(null, {id:id, text: text.toString()});
    }
  });

  /*
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
  */
};

exports.update = (id, text, callback) => {
  exports.readOne(id, (err)=> {
    if (err) {
      console.error('Update Error: ', err);
      callback(err);
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          console.error('Update error: ', err);
          callback(err);
        } else {
          callback(null, { id, text });
        }
      });
    }
  });



  /*
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
  */
};

exports.delete = (id, callback) => {
  exports.readOne(id, (err)=> {
    if (err) {
      console.error('Deletion Error: ', err);
      callback(err);
    } else {
      fs.unlink(path.join(exports.dataDir, `${id}.txt`), (err) => {
        if (err) {
          console.error('Deletion error: ', err);
          callback(err);
        } else {
          callback(null, id);
        }
      });
    }
  });


  /*
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
  */
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
