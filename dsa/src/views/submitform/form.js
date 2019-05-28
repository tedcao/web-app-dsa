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
var config = require("../../config");

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    //.match can be used for number in the future
    student_number: Yup.string()
      .min(9, "Please enter a valid student number")
      .max(9, "Please enter a valid student number")
      .required("Student number is required"),
    name: Yup.string().required("Please entre your name"),
    home_faculty: Yup.string().required("Please select your home faculty"),
    //.match can be used for number in the future
    phone: Yup.string()
      .min(10, "Please enter a valid phone number")
      .max(10, "Please enter a valid phone number")
      .required("Please entre your phone number"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!")
    // course: Yup.string().required("Course is required!")
  }),
  mapPropsToValues: props => ({
    student_number: "",
    name: "",
    home_faculty: "",
    phone: "",
    email: "",
    course: "",
    aggrement: "false",
    files: [],
    file1_des: "",
    file2_des: "",
    file3_des: "",
    submit: "123"
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values
    };

    let formdata = new FormData(); //initialize formdata and append the information to form-data
    formdata.append("student_id", payload.student_number);
    formdata.append("name", payload.name); //not used
    formdata.append("home_faculty", payload.home_faculty.value);
    formdata.append("student_phone", payload.phone);
    formdata.append("student_email", payload.email);
    formdata.append("courseandsection", payload.course.value);
    formdata.append("aggrement", payload.aggrement);
    formdata.append("file1_des", payload.file1_des);
    formdata.append("file2_des", payload.file2_des);
    formdata.append("file3_des", payload.file3_des);
    formdata.append("file", payload.files[0]);
    formdata.append("file", payload.files[1]);
    formdata.append("file", payload.files[2]);

    axios({
      //send the form-data to inserttask using post method
      enctype: "multipart/form-data",
      url: config.urlPrefix + "insertTask",
      method: "POST",
      data: formdata
    }).then(res => {
      console.log(res);
    });
  },

  displayName: "MyForm"
});

class MyForm extends React.Component {
  state = {
    courses: [],
    submitNotice: ""
  };

  handleSNFieldBlur = e => {
    //function called when student number section lose focus
    this.props.handleBlur(e);
    this.CourseList(this.props.values.student_number);
  };

  async CourseList(student_number) {
    //use the student number to get the corresponding course information by using  /enrollment_search/:student_id
    var url = `${config.urlPrefix}enrollment_search/${student_number}`;
    const response = await axios.post(url);
    this.setState({ courses: response.data.data });
  }

  notice(e) {
    this.setState({
      submitNotice:
        "Submitted, Check your email for recipt and reference number. If email was not arrive in 5 mins, please try again later."
    });
  }

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      isSubmitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <strong>Tips: </strong>
            <br />
            1. Course selection will be available within 7 days befor exam date.
            (Otherwise, no results found will show up)
            <br /> 2. You can submit DSA for only one time for each course.
            <br />
            3. Please contact admin office if you have trouble
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="student_number" className="col-2 col-form-label">
            Student Number
          </label>
          <input
            className="form-control col-10"
            id="student_number"
            placeholder="Enter your student number"
            value={values.student_number}
            onChange={handleChange}
            onBlur={this.handleSNFieldBlur}
          />
          <div className="col-2" />
          {errors.student_number && touched.student_number && (
            <div className="alert alert-danger col-10">
              {errors.student_number}
            </div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-2 col-form-label">
            Name
          </label>
          <input
            className="form-control col-10"
            id="name"
            placeholder="Please entre your legal name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="col-2" />
          {errors.name && touched.name && (
            <div className="alert alert-danger col-10">{errors.name}</div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="color" className="col-2">
            Home Faculty
          </label>
          <FacultySelect
            className="form-control col-10"
            value={values.home_faculty}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.home_faculty}
            touched={touched.home_faculty}
          />
        </div>
        <div className="form-group row">
          <label htmlFor="phone" className="col-2">
            Phone
          </label>
          <input
            className="form-control col-10"
            id="phone"
            placeholder="Please entre your phone number"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="col-2" />
          {errors.phone && touched.phone && (
            <div className="alert alert-danger col-10">{errors.phone}</div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-2">
            Email
          </label>
          <input
            className="form-control col-10"
            id="email"
            placeholder="Enter your email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="col-2" />
          {errors.email && touched.email && (
            <div className="alert alert-danger col-10">{errors.email}</div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="course_section" className="col-2">
            Select your Course and Section
          </label>
          <CourseSelect
            value={values.course}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.course}
            touched={touched.course}
            courses={this.state.courses}
          />
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="file">
              Please upload your supported documents!
            </label>
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
                isDragReject
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
                        <ListThumb files={values.files} />
                      </div>
                    </section>
                  );
                } else {
                  return <ListThumb files={values.files} />;
                }
              }}
            </Dropzone>
          </div>
          <div className="form-group col-6">
            <span htmlFor="file1_des">First file Description</span>
            <input
              className="form-control"
              id="file1_des"
              placeholder="Please entre description"
              value={values.file1_des}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span htmlFor="file2_des">Second file Description</span>
            <input
              className="form-control"
              id="file2_des"
              placeholder="Please entre description"
              value={values.file2_des}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span htmlFor="file3_des">Third file Description</span>
            <input
              className="form-control"
              id="file3_des"
              placeholder="Please entre description"
              value={values.file3_des}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className="custom-control custom-checkbox row">
          <input
            className="custom-control-input col-12"
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
        <div className="row">
          <div className="col-6" />
          <button
            className="btn btn-primary btn-lg col-6"
            type="submit"
            disabled={isSubmitting}
            onClick={e => {
              this.notice(e);
            }}
          >
            Submit
          </button>
          <div className="col-6" />
          <div className="col-6">{this.state.submitNotice}</div>
        </div>

        {/* <DisplayFormikState {...this.props} /> */}
      </form>
    );
  }
}

const MyEnhancedForm = formikEnhancer(MyForm); //reform the form using formik

export default MyEnhancedForm;
