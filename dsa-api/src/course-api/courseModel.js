var mongoose = require("mongoose");

// Setup schema
var courseSchema = mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  exam_date: {
    type: Date,
    required: true
  },
  instructor: {
    type: String,
    require: true
  },
  supervisor: {
    type: String,
    require: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Course = (module.exports = mongoose.model("course", courseSchema));

module.exports.get = function(callback, limit) {
  Course.find(callback).limit(limit);
};
