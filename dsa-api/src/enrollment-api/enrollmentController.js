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
exports.new = function(req, res) {
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

// Handle view enrollment info (find enrollment record based on id)
exports.view = function(req, res) {
  Enrollment.findById(req.params.enrollment_id, function(err, enrollment) {
    if (err) res.send(err);
    res.json({
      message: "Enrollment details loading..",
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

    // save the contact and check for errors
    contact.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Contact Info updated",
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
        message: "Contact deleted"
      });
    }
  );
};

// return course tooken by student
exports.course = function(req, res) {
  Enrollment.findById(req.params.student_id, function(err, enrollment) {
    if (err) res.send(err);
    res.json({
      message: "Student course details loading..",
      data: enrollment
    });
  });
};