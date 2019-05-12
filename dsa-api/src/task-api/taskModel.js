var mongoose = require("mongoose");

// Setup schema
var taskSchema = mongoose.Schema({
  student_id: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  section: {
    type: String,
    require: true
  },
  student_email: {
    type: String,
    require: true
  },
  student_phone: {
    type: Number
  },
  home_faculty: {
    type: String,
    require: true
  },
  instructor: {
    type: String,
    require: true
  },
  supervisor: {
    type: String,
    require: true
  },
  files: {
    type: String
  },
  file1_des: {
    type: String
  },
  file2_des: {
    type: String
  },
  file3_des: {
    type: String
  },
  approve: {
    type: Boolean,
    required: true,
    default: false
  },
  aggrement: {
    type: Boolean,
    required: true,
    default: false
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Task = (module.exports = mongoose.model("task", taskSchema));

module.exports.get = function(callback, limit) {
  Task.find(callback).limit(limit);
};