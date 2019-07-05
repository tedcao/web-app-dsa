/*------  multre config  ---------*/
var multer = require("multer");
var file_destination = "./data/";
var upload = multer({ dest: file_destination }).single("file");
/*------   end of multre config   ------*/
Course = require("../course-api/courseModel"); //import the course schema structure
Enrollment = require("../enrollment-api/enrollmentModel");
const csv = require("fast-csv");
var fs = require("fs");
resolve = require("path").resolve;

// download  file from uploads based on name
exports.get = function(req, res) {
  var filename = req.params.file_name;
  var file = __dirname + "/../uploads/" + filename; //file name and location
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
    } else {
      var filepath = req.file.path;
      var file = resolve(__dirname + "/../" + filepath); //csv file need to be changed
      const fileStream = fs.createReadStream(file);
      const parser = csv.parse();

      fileStream
        .pipe(parser)
        .on("error", error => res.json(error))
        .on("readable", () => {
          for (let row = parser.read(); row; row = parser.read()) {
            var course = new Course();
            course.course = row[0];
            course.section = row[1];
            course.instructor = row[2];
            course.supervisor = row[3];
            course.exam_date = row[4];
            course.save(function(err) {
              if (err) res.json(err);
              console.log((ROW = `${JSON.stringify(row)}`));
            });
          }
        })
        .on("end", rowCount =>
          res.json({
            status: 200,
            message: "Data inserted",
            data: (ROW = `There are ${rowCount} lines of record inserted`)
          })
        );
    }
  });
};

exports.uploadEnrollmentInformation = function(req, res) {
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
    } else {
      // console.log(req.file);
      var filepath = req.file.path;
      var file = resolve(__dirname + "/../" + filepath); //csv file need to be changed
      const fileStream = fs.createReadStream(file);
      const parser = csv.parse();

      fileStream
        .pipe(parser)
        .on("error", error => res.json(error))
        .on("readable", () => {
          for (let row = parser.read(); row; row = parser.read()) {
            var enrollment = new Enrollment();
            enrollment.course = row[0];
            enrollment.section = row[1];
            enrollment.term = row[2];
            enrollment.student = row[3];
            enrollment.student_email = row[4];
            enrollment.save(function(err) {
              if (err) res.json(err);
              console.log((ROW = `${JSON.stringify(row)}`));
            });
          }
        })
        .on("end", rowCount =>
          res.json({
            status: 200,
            message: "Data inserted",
            data: (ROW = `There are ${rowCount} lines of record inserted`)
          })
        );
    }
  });
};
