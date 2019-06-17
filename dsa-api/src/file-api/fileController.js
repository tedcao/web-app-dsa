/*------  multre config  ---------*/
var multer = require("multer");
var file_destination = "./data/";
var upload = multer({ dest: file_destination }).single("file");
/*------   end of multre config   ------*/

// download  file from uploads based on name
exports.get = function(req, res) {
  var filename = req.params.file_name;
  var file = __dirname + "/../uploads/" + filename;
  res.download(file); //send the download request back
};

exports.uploadCourseInformation = function(req, res) {
  upload(req, res, function(err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        message: "fail, check console for detail",
        data: err
      });
    } else if (err) {
      return res.status(500).json({
        message: "fail, check console for detail",
        data: err
      });
    }
    return res.status(200).json({
      message: "success",
      data: req.file
    });
  });
};

exports.uploadEnrollmentInformation = function(req, res) {};
