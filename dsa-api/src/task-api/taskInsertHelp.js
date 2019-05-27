Course = require("../course-api/courseModel");
var hashConfig = require("../../config"); //hash passward and information
var crypto = require("crypto");

var algorithm = hashConfig.algorithm;
var password = hashConfig.password;

//get the insturctor email from course table
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

//get the supervisor email from course table
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

//encrypt function used on hash the income string
function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

//encrypt function used on dehash the income string
function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

exports.getInstructor = getInstructor;
exports.getSupervisor = getSupervisor;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
