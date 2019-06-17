import React from "react";
import CourseDataUpload from "./courseDataUpload";
import EnrollmentDataUoload from "./enrollmentDataUpload";

class StudentDataUpload extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <CourseDataUpload />
          </div>
          <div className="col-6">
            <EnrollmentDataUoload />
          </div>
        </div>
      </div>
    );
  }
}

export default StudentDataUpload;
