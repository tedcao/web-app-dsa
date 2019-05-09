Enrollment = require("./enrollmentModel");

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
  Enrollment.find({ student: req.params.student_id }, function(
    err,
    enrollment
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Infomation retrived successfully. ",
        data: formate(enrollment)
      });
    }
  });
};

function formate(enrollment) {
  var length = enrollment.length;
  var list = [];
  var i;
  for (i = 0; i < enrollment.length; i++) {
    var result =
      "Course: " +
      enrollment[i].course +
      "   Section: " +
      enrollment[i].section;
    list.push({ value: result, label: result });
  }
  return list;
}
