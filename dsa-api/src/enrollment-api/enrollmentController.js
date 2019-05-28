Enrollment = require("./enrollmentModel");
Course = require("../course-api/courseModel");
var allowedTime = 6048000000; // 7 / 0 days in millisecond

// Handle index actions
exports.index = function(req, res) {
  Enrollment.get(function(err, enrollments) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Enrollment information retrieved successfully",
      data: enrollments
    });
  });
};

// Handle create enrollment actions
exports.insert = function(req, res) {
  var enrollment = new Enrollment();
  enrollment.course = req.body.course ? req.body.course : enrollment.course;
  enrollment.section = req.body.section;
  enrollment.term = req.body.term;
  enrollment.student = req.body.student;

  // save the enrollment and check for errors
  enrollment.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New enrollment created!",
      data: enrollment
    });
  });
};

// Handle update enrollment info
exports.update = function(req, res) {
  Enrollment.findById(req.params.enrollment_id, function(err, enrollment) {
    if (err) res.send(err);

    enrollment.course = req.body.course ? req.body.course : enrollment.course;
    enrollment.section = req.body.section;
    enrollment.term = req.body.term;
    enrollment.student = req.body.student;
    enrollment.dsa_submitted = req.body.dsa_submitted;

    // save the Enrollment information and check for errors
    enrollment.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Enrollment Info updated",
        data: enrollment
      });
    });
  });
};

// Handle delete enrollment
exports.delete = function(req, res) {
  Enrollment.remove(
    {
      _id: req.params.enrollment_id
    },
    function(err, enrollment) {
      if (err) res.send(err);

      res.json({
        status: "success",
        message: "Enrollment information deleted"
      });
    }
  );
};

// return enrollment information of particular student
exports.enrollment = function(req, res) {
  Enrollment.find({ student: req.params.student_id }, async function(
    err,
    enrollment
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Infomation retrived successfully. ",
        data: await formate(enrollment)
      });
    }
  });
};

//formate the return. only return the course that exam data within 7 days
async function formate(enrollment) {
  var list = []; //initialize the return list
  //iterate all the enrolled course, check deadline and dsa form history
  for (var i = 0; i < enrollment.length; i++) {
    var course = enrollment[i].course;
    var section = enrollment[i].section;
    var dsa_submitted = enrollment[i].dsa_submitted;
    //retrive the exam_date information from course database
    var courseInfo = await Course.find({ course: course }, function(
      err,
      course
    ) {
      if (err) {
        res.send(err);
      }
    });

    var diff = new Date() - courseInfo[0].exam_date; // determine the time difference between exam date and current date

    var result = "Course: " + course + "   Section: " + section;
    if (diff < allowedTime && dsa_submitted === false) {
      list.push({ value: result, label: result });
    } else if (diff > allowedTime) {
      list.push({
        value:
          course +
          " Section:" +
          section +
          "DSA deadline passed, Do not select !",
        label:
          course +
          " Section:" +
          section +
          "DSA deadline passed, Do not select !"
      });
    } else {
      list.push({
        value:
          course +
          " Section:" +
          section +
          " DSA submitted before. Do not select!",
        label:
          course +
          " Section:" +
          section +
          " DSA submitted before. Do not select!"
      });
    }
  }
  return list;
}
