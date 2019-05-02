Course = require("./courseModel");

// Handle index actions
exports.index = function(req, res) {
  Course.get(function(err, courses) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Course information retrieved successfully",
      data: courses
    });
  });
};

// Handle create course actions
exports.new = function(req, res) {
  var course = new Course();
  course.course = req.body.course ? req.body.course : course.course;
  course.section = req.body.section;
  course.term = req.body.term;
  course.instructor = req.body.instructor;
  course.supervisor = req.body.supervisor;

  // save the course and check for errors
  course.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New course created!",
      data: course
    });
  });
};

// // Handle view enrollment info (find enrollment record based on id)
exports.view = function(req, res) {
  Course.findById(req.params.course_id, function(err, course) {
    if (err) res.send(err);
    res.json({
      message: "Course details loading..",
      data: course
    });
  });
};

// Handle update course info
exports.update = function(req, res) {
  Course.findById(req.params.course_id, function(err, course) {
    if (err) res.send(err);

    course.course = req.body.course ? req.body.course : course.course;
    course.section = req.body.section;
    course.term = req.body.term;
    course.student = req.body.student;

    // save the course and check for errors
    course.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Course Info updated",
        data: course
      });
    });
  });
};

// Handle delete course information based on id
exports.delete = function(req, res) {
  Course.remove(
    {
      _id: req.params.course_id
    },
    function(err, enrollment) {
      if (err) res.send(err);

      res.json({
        status: "success",
        message: "Course information deleted"
      });
    }
  );
};

// return enrollment information of particular student
//: course_name :section
exports.course = function(req, res) {
  Course.find(
    { course: req.params.course_name, section: req.params.section },
    function(err, course) {
      if (err) res.send(err);
      res.json({
        message: "Student course details loading..",
        data: course
      });
    }
  );
};
