Course = require("../course-api/courseModel");

async function getInstructor(course, section, res) {
  let instructor_email = await Course.find(
    { course: course, section: section },
    function(err, courseList) {
      if (err) {
        res.send(err);
      }
    }
  );
  return instructor_email[0].instructor;
}

async function getSupervisor(course, section, res) {
  let supervisor_email = await Course.find(
    { course: course, section: section },
    function(err, courseList) {
      if (err) {
        res.send(err);
      }
    }
  );
  return supervisor_email[0].supervisor;
}

exports.getInstructor = getInstructor;
exports.getSupervisor = getSupervisor;
