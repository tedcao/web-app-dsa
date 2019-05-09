import "./helper.css";
import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import "react-select/dist/react-select.css";
import {
  DisplayFormikState,
  FacultySelect,
  CourseSelect,
  ListThumb
} from "./help";
import axios from "axios";
import Dropzone from "react-dropzone";
const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5
};

const queryString = require("query-string");

const formikEnhancer = withFormik({
  // validationSchema: Yup.object().shape({
  //   //.match can be used for number in the future
  //   student_number: Yup.string()
  //     .min(9, "Please enter a valid student number")
  //     .max(9, "Please enter a valid student number")
  //     .required("Student number is required"),
  //   name: Yup.string().required("Please entre your name"),
  //   home_faculty: Yup.string().required("Please select your home faculty"),
  //   //.match can be used for number in the future
  //   phone: Yup.string()
  //     .min(10, "Please enter a valid phone number")
  //     .max(10, "Please enter a valid phone number")
  //     .required("Please entre your phone number"),
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required!")
  //   // course: Yup.string().required("Course is required!")
  // }),
  mapPropsToValues: props => ({
    student_number: "",
    name: "",
    home_faculty: "",
    phone: "",
    email: "",
    course: "",
    aggrement: "",
    // file: "",
    // file2: "",
    files: []
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values
    };
    let formdata = new FormData();
    formdata.append("student_id", payload.student_number);
    formdata.append("name", payload.name); //not used
    formdata.append("home_faculty", payload.home_faculty.value);
    formdata.append("student_phone", payload.phone);
    formdata.append("student_email", payload.email);
    formdata.append("courseandsection", payload.course.value);
    formdata.append("aggrement", payload.aggrement);
    formdata.append("file", payload.files[0]);
    formdata.append("file", payload.files[1]);
    formdata.append("file", payload.files[2]);

    axios({
      enctype: "multipart/form-data",
      url: "http://localhost:8080/api/insertTask",
      method: "POST",
      data: formdata
    }).then(res => {
      console.log(res);
    });
  },

  displayName: "MyForm"
});

class MyForm extends React.Component {
  state = { courses: [] };

  handleSNFieldBlur = e => {
    this.props.handleBlur(e);
    this.CourseList(this.props.values.student_number);
  };

  async CourseList(student_number) {
    //use the student number to get the corresponding course information by using  /enrollment_search/:student_id
    var url = `http://localhost:8080/api/enrollment_search/${student_number}`;
    const response = await axios.post(url);
    this.setState({ courses: response.data.data });
  }

  render() {
    const {
      values,
      touched,
      dirty,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      setFieldValue,
      setFieldTouched,
      isSubmitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student_number">Student Number</label>
          <input
            className="form-control"
            id="student_number"
            placeholder="Enter your student number"
            value={values.student_number}
            onChange={handleChange}
            onBlur={this.handleSNFieldBlur}
          />
          {errors.student_number && touched.student_number && (
            <div className="alert alert-danger">{errors.student_number}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            placeholder="Please entre your legal name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <div className="alert alert-danger">{errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <FacultySelect
            className="form-control"
            value={values.home_faculty}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.home_faculty}
            touched={touched.home_faculty}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            className="form-control"
            id="phone"
            placeholder="Please entre your phone number"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && touched.phone && (
            <div className="alert alert-danger">{errors.phone}</div>
          )}
        </div>
        <div className="form-group">
          <label id="email_label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            id="email"
            placeholder="Enter your email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <div className="alert alert-danger">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <CourseSelect
            className="form-control"
            value={values.course}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.course}
            touched={touched.course}
            courses={this.state.courses}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Please upload your supported documents!</label>
          <br />
          <Dropzone
            name="file1234"
            style={dropzoneStyle}
            accept="application/pdf"
            onDrop={acceptedFiles => {
              if (acceptedFiles.length === 0) {
                return;
              }
              setFieldValue("files", values.files.concat(acceptedFiles));
            }}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragReject,
              acceptedFiles,
              rejectedFiles
            }) => {
              if (isDragActive) {
                return "This file is authorized";
              }

              if (isDragReject) {
                return "This file is not authorized";
              }

              if (values.files.length < 3) {
                return (
                  <section>
                    <div className="upload_file" {...getRootProps()}>
                      <input name="userFiles" {...getInputProps()} />
                      <p>Click to upload the file! (Up to three)</p>
                    </div>
                    <ListThumb files={values.files} />
                  </section>
                );
              } else {
                return <ListThumb files={values.files} />;
              }
            }}
          </Dropzone>
        </div>

        <div className="custom-control custom-checkbox">
          <input
            className="custom-control-input"
            id="aggrement"
            type="checkbox"
            value={values.aggrement}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label
            className="custom-control-label"
            id="aggrement_label"
            htmlFor="aggrement"
          >
            Check if you registered with Counselling/Disability services
          </label>
        </div>

        <button
          type="button"
          className="outline btn btn-secondary btn-lg col-4"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </button>
        <button
          className="btn btn-primary btn-lg col-4"
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </button>
        <DisplayFormikState {...this.props} />
      </form>
    );
  }
}

const MyEnhancedForm = formikEnhancer(MyForm);

export default MyEnhancedForm;
