var multer = require('multer');
var path = require('path');
var fs = require('fs');
var util = require('util');
var Auth = require('../controller/authController');


module.exports = function (app) {

  // route for files
  app.route('/filedownload').get(async function (req, res) {
    var dir = path.resolve(".") + '/app/public/uploaded/';
    console.log("Download file " + dir);
    var readdir = util.promisify(fs.readdir);
    try {
      await readdir(dir)
        .then((names) => {
          res.json(names);
        });
    } catch (e) {
      console.log('e', e);
    }
  });


  app.route('/filedownload/:file(*)').get(  async (req, res, next)=> {
    var file = req.params.file;
    var dpath = path.resolve(".") + '/app/public/uploaded/' + file;
    console.log(file + " Path = " + dpath);
    var token =  await Auth.jwtTokenChecker(req, res);
    if(token)
    res.download(dpath, file, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('downloading successful');
      }
    });
  });

  app.route('/fileupload').post(async function (req, res) {
    console.log("File uploading..");
    var upath = path.resolve(".") + '/app/public/uploaded/';
    console.log(upath);

    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, upath);
      },
      filename: function (req, file, callback) {
        console.log(path.extname(file.originalname));
        callback(null, Date.now() + path.extname(file.originalname));
      }
    });

   upload = util.promisify( multer({ storage: storage }).array('userPhoto', 5));

   try {
           await upload(req, res);
            res.end("File is uploaded");
       } 
       catch (err) {
      return res.end("Error uploading file.");
       }

  });

}