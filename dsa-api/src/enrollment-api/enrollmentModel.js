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
  student: {
    type: Number,
    require: true
  },
  dsa_submitted: {
    type: Boolean,
    default: false
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
