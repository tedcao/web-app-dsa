import React from "react";
import axios from "axios";
var config = require("../../config");

class EnrollmentDataUoload extends React.Component {
  onChangeHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      file: event.target.files[0],
      message: ""
    });
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.file);

    axios({
      //send the form-data to inserttask using post method
      enctype: "multipart/form-data",
      url: config.urlPrefix + "uploadEnrollmentInformation",
      method: "POST",
      data: data
    }).then(res => {
      this.setState({ message: res });
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      file1: "null"
    };
  }
  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="enrollmentFile">
            Please upload Enrollment information :
          </label>
          <input
            type="file"
            name="enrollmentFile"
            className="form-control-file"
            id="enrollmentFile"
            onChange={this.onChangeHandler}
          />
        </div>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={this.onClickHandler}
        >
          Upload
        </button>
      </div>
    );
  }
}

export default EnrollmentDataUoload;
