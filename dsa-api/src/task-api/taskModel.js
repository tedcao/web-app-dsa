var mongoose = require("mongoose");

// Setup schema
var taskSchema = mongoose.Schema({
  reference_number: {
    type: Number,
    requires: true
  },
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
  name: {
    type: String
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
    type: String,
    default: null
  },
  file2_des: {
    type: String,
    default: null
  },
  file3_des: {
    type: String,
    default: null
  },
  approve: {
    type: Boolean,
    required: true,
    default: false
  },
  modified: {
    type: Boolean,
    require: true,
    default: false
  },
  state: {
    type: String,
    default: "pending"
    //pending, verified, approved, denied
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
