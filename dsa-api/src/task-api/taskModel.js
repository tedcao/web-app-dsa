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
  term: {
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
  approve: {
    type: Boolean,
    required: true
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
