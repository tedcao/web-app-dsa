import React from "react";
import axios from "axios";
var config = require("../../config");

class CourseDataUoload extends React.Component {
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
      url: config.urlPrefix + "uploadCourseInformation",
      method: "POST",
      data: data
    }).then(res => {
      this.setState({ message: res });
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      file: "null"
    };
  }
  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="courseFile">Please upload course information :</label>
          <input
            type="file"
            name="courseFile"
            className="form-control-file"
            id="courseFile"
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
        {/* {this.state.message} */}
      </div>
    );
  }
}

export default CourseDataUoload;
