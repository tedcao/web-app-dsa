// download needed file
exports.get = function(req, res) {
  var filename = req.params.file_name;
  var file = __dirname + "/../uploads/" + filename;
  res.download(file); //send the download request back
};
