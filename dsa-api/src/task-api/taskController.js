Task = require("./taskModel");
var tools = require("./taskInsertHelp");
Course = require("../course-api/courseModel");

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
  /*----   Function of uploading files -------*/
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    var courseandsection = await req.body.courseandsection;
    var student_id = req.body.student_id;
    var name = req.body.name;
    var student_email = req.body.student_email;
    var student_phone = req.body.student_phone;
    var home_faculty = req.body.home_faculty;
    var course = courseandsection.substring(8, 16);
    var section = courseandsection.substring(28);
    let instructor = await tools.getInstructor(course, section, res); //reteive instructor email form course table
    //get the hash of insturctor email and assign to encrypt
    // let encryptcode = await tools.encrypt(instructor);
    // let decrypted = await tools.decrypt(encryptcode);
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
    task.name = name;
    task.student_phone = student_phone;
    task.home_faculty = home_faculty;
    task.instructor = instructor;
    // task.encryptcode = encryptcode;
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
      res.json({
        message: "New task created!",
        data: task
      });
    });
  });

  /*----   End of Function of uploading files -------*/
};

exports.update = function(req, res) {
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

// return search based on the sinstructor email
exports.search = function(req, res) {
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
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.approve = true;
    task.modified = true;
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
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.approve = false;
    task.modified = true;
    task.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Task information updated",
        data: true
      });
    });
  });
};

exports.overwrite = function(req, res) {
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.modified = false;
    task.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Task information updated",
        data: true
      });
    });
  });
};
