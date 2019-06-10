Task = require("./taskModel");
var tools = require("./taskInsertHelp");
Course = require("../course-api/courseModel");
Enrollment = require("../enrollment-api/enrollmentModel");
var email = require("./email/email");

/*------  multre config  ---------*/
var multer = require("multer");
var file_destination = "./uploads/";
// var upload = multer({ dest: file_destination }).array("file", 3);
var upload = multer({ dest: file_destination }).fields([
  { name: "file", maxCount: 3 }
]);
// var textupload = multer({ dest: file_destination }).none();
/*------   end of multre config   ------*/

// Handle index actions
exports.index = function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (tools.decrypt(req.params.encryptcode) == req.params.supervisor_email) {
    Task.find(
      {
        supervisor: req.params.supervisor_email
      },
      function(err, task) {
        if (err) res.send(err);
        return res.json({
          message: "Student course details loading..",
          data: task
        });
      }
    );
  } else {
    return res.json({
      message: "404"
    });
  }
};

// Insert new task information
exports.insert = function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  /*----   Function of uploading files -------*/
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    await Task.find()
      .sort({ _id: -1 })
      .skip(0)
      .limit(1)
      .exec(function(err, docs) {
        if (err) {
          res.send(err);
        } else {
          if (docs[0].reference_number) {
            last_reference_number = docs[0].reference_number;
          } else {
            last_reference_number = 100001;
          }
        }
      });
    var courseandsection = await req.body.courseandsection;
    var student_id = req.body.student_id;
    var name = req.body.name;
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
    task.reference_number = last_reference_number + 1;
    task.student_id = student_id;
    task.course = course;
    task.section = section;
    task.student_email = student_email;
    task.name = name;
    task.student_phone = student_phone;
    task.home_faculty = home_faculty;
    task.instructor = instructor;
    task.supervisor = supervisor;
    task.files = files;
    task.aggrement = aggrement;
    task.file1_des = file1_des;
    task.file2_des = file2_des;
    task.file3_des = file3_des;
    task.create_date = new Date().getTime();

    // save the enrollment and check for errors
    task.save(function(err) {
      if (err) res.json(err);
      else {
        //after DSA form submitted, Enrollment table dsa_submitted section need to be changed to true
        Enrollment.findOneAndUpdate(
          { student: student_id, course: course, section: section },
          { $set: { dsa_submitted: true } },
          { useFindAndModify: false },
          (err, enrollment) => {
            if (err) res.json(err);
            // res.json({
            //   message: "updated"
            // });
          }
        );
        // send out the email
        email.studentEmail(
          task._id,
          task.reference_number,
          name,
          student_email,
          student_phone,
          course,
          section,
          files,
          aggrement,
          file1_des,
          file2_des,
          file3_des
        );
        email.insturctorEmail(name, instructor, course, section);
        email.supervisorEmail(name, supervisor, course, section);
        res.json({
          message: "New task created!",
          data: task
        });
      }
    });
  });

  /*----   End of Function of uploading files -------*/
};

exports.update = function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.student_id = req.body.student_id;
    task.name = req.body.name;
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
    task.modified = req.body.modified;

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

// return search based on the instructor email
exports.search = function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (tools.decrypt(req.params.encryptcode) == req.params.instructor_email) {
    Task.find(
      {
        instructor: req.params.instructor_email
      },
      function(err, task) {
        if (err) res.send(err);
        return res.json({
          message: "Student course details loading..",
          data: task
        });
      }
    );
  } else {
    return res.json({
      message: "404"
    });
  }
};

exports.approve = function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.approve = true;
    task.modified = true;
    email.taskStateUpdate(
      "Approved",
      task.name,
      task._id,
      task.reference_number,
      task.course,
      task.section,
      task.student_id,
      task.instructor,
      task.supervisor,
      task.student_email
    );
    task.save(function(err) {
      if (err) res.json(err);

      res.json({
        message: "Task information updated",
        data: true
      });
    });
  });
};

exports.deny = function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.approve = false;
    task.modified = true;
    task.save(function(err) {
      if (err) res.json(err);
      email.taskStateUpdate(
        "Denied",
        task.name,
        task._id,
        task.reference_number,
        task.course,
        task.section,
        task.student_id,
        task.instructor,
        task.supervisor,
        task.student_email
      );
      res.json({
        message: "Task information updated",
        data: true
      });
    });
  });
};

exports.overwrite = function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.modified = false;
    task.save(function(err) {
      if (err) res.json(err);
      email.taskStateUpdate(
        "Undo",
        task.name,
        task._id,
        task.reference_number,
        task.course,
        task.section,
        task.student_id,
        task.instructor,
        task.supervisor,
        task.student_email
      );
      res.json({
        message: "Task information updated",
        data: true
      });
    });
  });
};
