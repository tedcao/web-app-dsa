Task = require("./taskModel");
var tools = require("./taskInsertHelp");
var multer = require("multer");
var file_destination = "./uploads/";
// var upload = multer({ dest: file_destination }).array("file", 3);
var upload = multer({ dest: file_destination }).fields([
  { name: "file", maxCount: 3 }
]);
// var textupload = multer({ dest: file_destination }).none();
Course = require("../course-api/courseModel");

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
  /*----   Function of uploading files -------*/
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    var courseandsection = await req.body.courseandsection;
    var student_id = req.body.student_id;
    var student_email = req.body.student_email;
    var student_phone = req.body.student_phone;
    var home_faculty = req.body.home_faculty;
    var course = courseandsection.substring(8, 16);
    var section = courseandsection.substring(28);
    let instructor = await tools.getInstructor(course, section, res); //reteive instructor email form course table
    let supervisor = await tools.getSupervisor(course, section, res); // retrive supervisor email from course table
    var aggrement = req.body.aggrement;
    var files = JSON.stringify(req.files);
    var file1_des = req.body.file1_des;
    var file2_des = req.body.file2_des;
    var file3_des = req.body.file3_des;

    var task = new Task();
    task.student_id = student_id;
    task.course = course;
    task.section = section;
    task.student_email = student_email;
    task.student_phone = student_phone;
    task.home_faculty = home_faculty;
    task.instructor = instructor;
    task.supervisor = supervisor;
    task.files = files;
    task.aggrement = aggrement;
    task.file1_des = file1_des;
    task.file2_des = file2_des;
    task.file3_des = file3_des;

    // save the enrollment and check for errors
    task.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "New task created!",
        data: task
      });
    });

    // return res.json({
    //   message: "Information retrived",
    //   data: [
    //     {
    //       // student_id: student_id,
    //       // student_email: student_email,
    //       // student_phone: student_phone,
    //       // home_faculty: home_faculty,
    //       // course: course,
    //       // section: section,
    //       files: files
    //       // supervisor_email: instructor,
    //       // instructor_email: supervisor,
    //       // approve: approve
    //       // course,
    //       // section
    //     }
    //   ]
    // });
  });

  /*----   End of Function of uploading files -------*/
};

exports.update = function(req, res) {
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.student_id = req.body.student_id;
    task.course = req.body.course;
    task.section = req.body.section;
    task.term = req.body.term;
    task.student_email = req.body.student_email;
    task.student_phone = req.body.student_phone;
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
    return res.json({
      message: "Student course details loading..",
      data: task
    });
  });
};
