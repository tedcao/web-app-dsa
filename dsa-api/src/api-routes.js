// Initialize express router
let router = require("express").Router();
var courseController = require("./course-api/courseController");
var enrollmentController = require("./enrollment-api/enrollmentController");
var taskController = require("./task-api/taskController");
var fileController = require("./file-api/fileController");

// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "DSA API server is running!"
  });
});

/* ------   Start of Enrollment router  -----------*/
router.route("/enrollmentList").post(enrollmentController.index); //list enrollment information
router.route("/insertEnrollment").post(enrollmentController.insert); //insert enrollment information
router
  .route("/updateEnrollment/:enrollment_id")
  .post(enrollmentController.update); //update the enrollment information based on enrollment id

router
  .route("/deleteEnrollment/:enrollment_id")
  .post(enrollmentController.delete); //delete the enrollment information based on enrollment id
router
  .route("/enrollment_search/:student_id")
  .post(enrollmentController.enrollment); //search enrollment based on student id
/* ------   End of Enrollment router  -----------*/

/* ------   Start of Course router  -----------*/
router.route("/courseList").post(courseController.index); //list the course information
router.route("/insertCourse").post(courseController.insert); //insert new information
router.route("/updateCourse/:course_id").post(courseController.update); //update the coruse information based on course id
router.route("/deleteCourse/:course_id").post(courseController.delete); //delete the course information based on course id
router
  .route("/course_search/:course_name&:section")
  .post(courseController.course); //search course information based on couse name and course section
/* ------   End of Course router  -----------*/

/* ------   Start of Task router  -----------*/
// router.route("/taskList").post(multipartMiddleware, taskController.index); //list all the task
router
  .route("/supervisor/:supervisor_email&:encryptcode")
  .post(taskController.index); //list all the task
router.route("/insertTask").post(taskController.insert); //insert new task
router.route("/updateTask/:task_id").post(taskController.update); //update task based on task id
// router.route("/deleteTask/:task_id").post(taskController.delete); //delete task based on task id
router.route("/deleteTask/").post(taskController.delete); //delete task based on task id
router
  .route("/instructor/:instructor_email&:encryptcode")
  .post(taskController.search); //search for tasks based on instructor name

router
  .route("/verify/:student_email&:encryptcode&:task_id")
  .get(taskController.verify);

router.route("/approve/:task_id").post(taskController.approve); //approve the task with corresponding task_id
router.route("/deny/:task_id").post(taskController.deny); //deny the task with corresponding task_id
router.route("/overwrite/:task_id").post(taskController.overwrite);
/* ------   End of Task router  -----------*/

router
  .route("/uploadCourseInformation/")
  .post(fileController.uploadCourseInformation);
router
  .route("/uploadEnrollmentInformation/")
  .post(fileController.uploadEnrollmentInformation);
router.route("/file/:file_name").get(fileController.get); //file download link

// Export API routes
module.exports = router;
