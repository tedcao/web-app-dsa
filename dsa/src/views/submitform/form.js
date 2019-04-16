import "./helper.css";
import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import "react-select/dist/react-select.css";

import { DisplayFormikState } from "./helper";

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
      .required("Email is required!"),
    course: Yup.string().required("Course is required!")
    //validation of uploaded files, do it later.
    // https://hackernoon.com/formik-handling-files-and-recaptcha-209cbeae10bc
    // upload_file:Yup.object()
  }),
  mapPropsToValues: props => ({
    student_number: "",
    name: "",
    home_faculty: "",
    phone: "",
    email: "",
    course: "",
    aggrement: "",
    upload_file: ""
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 4));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm"
});

const MyForm = props => {
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
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label htmlFor="student_number">Student Number</label>
        <input
          class="form-control"
          id="student_number"
          placeholder="Enter your student number"
          value={values.student_number}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.student_number && touched.student_number && (
          <div class="alert alert-danger">{errors.student_number}</div>
        )}
      </div>
      <div class="form-group">
        <label htmlFor="name">Name</label>
        <input
          class="form-control"
          id="name"
          placeholder="Please entre your legal name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <div class="alert alert-danger">{errors.name}</div>
        )}
      </div>
      <div class="form-group">
        <FacultySelect
          class="form-control"
          value={values.home_faculty}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.home_faculty}
          touched={touched.home_faculty}
        />
      </div>
      <div class="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          class="form-control"
          id="phone"
          placeholder="Please entre your phone number"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.phone && touched.phone && (
          <div class="alert alert-danger">{errors.phone}</div>
        )}
      </div>
      <div class="form-group">
        <label id="email_label" htmlFor="email">
          Email
        </label>
        <input
          class="form-control"
          id="email"
          placeholder="Enter your email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <div class="alert alert-danger">{errors.email}</div>
        )}
      </div>
      <div class="form-group">
        <CourseSelect
          class="form-control"
          value={values.course}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.course}
          touched={touched.course}
        />
      </div>

      <div class="custom-file">
        <input
          class="custom-file-input"
          type="file"
          value={values.upload_file}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label
          class="custom-file-label"
          id="upload_files"
          htmlFor="upload_files"
        >
          Please upload your application
        </label>
        {errors.upload_file && touched.upload_file && (
          <div class="alert alert-danger">{errors.upload_file}</div>
        )}
      </div>

      <div class="custom-control custom-checkbox">
        <input
          class="custom-control-input"
          id="aggrement"
          type="checkbox"
          value={values.aggrement}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label
          class="custom-control-label"
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
        class="btn btn-primary btn-lg col-4"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>

      <DisplayFormikState {...props} />
    </form>
  );
};

const faculty_options = [
  {
    value: "School of the Arts, Media, Performance & Design",
    label: "School of the Arts, Media, Performance & Design"
  },
  { value: "Faculty of Education", label: "Faculty of Education" },
  {
    value: "Faculty of Environmental Studies",
    label: "Faculty of Environmental Studies"
  },
  { value: "Glendon", label: "Glendon" },
  {
    value: "Faculty of Graduate Studies",
    label: "Faculty of Graduate Studies"
  },
  { value: "Faculty of Health", label: "Faculty of Health" },
  {
    value: "Lassonde School of Engineering",
    label: "Lassonde School of Engineering"
  },
  {
    value: "Faculty of Liberal Arts & Professional Studies",
    label: "Faculty of Liberal Arts & Professional Studies"
  },
  { value: "Osgoode Hall Law School", label: "Osgoode Hall Law School" },
  {
    value: "Schulich School of Business",
    label: "Schulich School of Business"
  },
  { value: "Faculty of Science", label: "Faculty of Science" }
];

class FacultySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("home_faculty", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur("home_faculty", true);
  };

  render() {
    return (
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="color">Home Faculty</label>
        <Select
          id="color"
          options={faculty_options}
          multi={false}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div class="alert alert-danger">{this.props.error}</div>
        )}
      </div>
    );
  }
}

const course_options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" }
];

class CourseSelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("course", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur("course", true);
  };

  render() {
    return (
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="color">Course</label>
        <Select
          id="color"
          options={course_options}
          multi={false}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div class="alert alert-danger">{this.props.error}</div>
        )}
      </div>
    );
  }
}

const MyEnhancedForm = formikEnhancer(MyForm);

export default MyEnhancedForm;
