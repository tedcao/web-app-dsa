// Initialize express router
let router = require("express").Router();

// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "DSA API server is running!"
  });
});

// Import contact controller
var enrollmentController = require("./enrollment-api/enrollmentController");

// Contact routes
router
  .route("/enrollment")
  .get(enrollmentController.index)
  .post(enrollmentController.new);

router
  .route("/enrollment/:enrollment_id")
  .get(enrollmentController.view)
  .patch(enrollmentController.update)
  .delete(enrollmentController.delete);

router.route("/course/:student_id").get(enrollmentController.course);

// Export API routes
module.exports = router;
