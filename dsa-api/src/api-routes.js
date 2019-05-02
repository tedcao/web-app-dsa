// Initialize express router
let router = require("express").Router();
var courseController = require("./course-api/courseController");
var enrollmentController = require("./enrollment-api/enrollmentController");
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "DSA API server is running!"
  });
});

/* ------   Start of Enrollment router  -----------*/
//index : return list of the enrollment table
//post : insert data into enrollment table
router
  .route("/enrollment")
  .get(enrollmentController.index)
  .post(enrollmentController.new);
//view: get particular enrollment record information
//patch: update particular enrollment record information
//delete: delete particular enrollment record information
router
  .route("/enrollment/:enrollment_id")
  .get(enrollmentController.view)
  .patch(enrollmentController.update)
  .delete(enrollmentController.delete);
//get : get particular student enrollment information
router
  .route("/enrollment_search/:student_id")
  .get(enrollmentController.enrollment);
/* ------   End of Enrollment router  -----------*/

/* ------   Start of Course router  -----------*/
//index : return list of the course table
//post : insert data into course table
router
  .route("/course")
  .get(courseController.index)
  .post(courseController.new);
//view: get particular course record information
//patch: update particular course record information
//delete: delete particular course record information
router
  .route("/course/:course_id")
  .get(courseController.view)
  .patch(courseController.update)
  .delete(courseController.delete);

//get course information based on name and section
router
  .route("/course_search/:course_name&:section")
  .get(courseController.course);
/* ------   End of Course router  -----------*/

// Export API routes
module.exports = router;
