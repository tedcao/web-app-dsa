var mongoose = require("mongoose");

// Setup schema
var enrollmentSchema = mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  term: {
    type: String,
    require: true
  },
  // student number
  student: {
    type: Number,
    require: true
  },
  student_email:{
    type:String,
    require: true
  },
  dsa_submitted: {
    type: Boolean,
    default: false,
    require: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Course_student = (module.exports = mongoose.model(
  "enrollment",
  enrollmentSchema
));

module.exports.get = function(callback, limit) {
  Course_student.find(callback).limit(limit);
};
