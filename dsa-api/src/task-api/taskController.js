Task = require("./taskModel");

// Handle index actions
exports.index = function(req, res) {
  Task.get(function(err, tasks) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Tasks information retrieved successfully",
      data: tasks
    });
  });
};

// Insert new task information
exports.insert = function(req, res) {
  var task = new Task();
  task.student_id = req.body.student_id;
  task.course = req.body.course;
  task.section = req.body.section;
  task.term = req.body.term;
  task.student_email = req.body.student_email;
  task.student_phone = req.body.student_phonel;
  task.home_faculty = req.body.home_faculty;
  task.instructor = req.body.instructor;
  task.supervisor = req.body.supervisor;
  task.file = req.body.file;
  task.approve = req.body.approve;

  // save the enrollment and check for errors
  task.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New task created!",
      data: task
    });
  });
};

exports.update = function(req, res) {
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.student_id = req.body.student_id;
    task.course = req.body.course;
    task.section = req.body.section;
    task.term = req.body.term;
    task.student_email = req.body.student_email;
    task.student_phone = req.body.student_phonel;
    task.home_faculty = req.body.home_faculty;
    task.instructor = req.body.instructor;
    task.supervisor = req.body.supervisor;
    task.file = req.body.file;
    task.approve = req.body.approve;

    task.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Task information updated",
        data: task
      });
    });
  });
};

// Handle delete enrollment
exports.delete = function(req, res) {
  Task.remove(
    {
      _id: req.params.task_id
    },
    function(err, task) {
      if (err) res.send(err);
      res.json({
        status: "Enrollment information deleted",
        message: task
      });
    }
  );
};

// return search based on the sinstructor email
exports.search = function(req, res) {
  Task.find({ instructor: req.params.instructor_name }, function(err, task) {
    if (err) res.send(err);
    res.json({
      message: "Student course details loading..",
      data: task
    });
  });
};
