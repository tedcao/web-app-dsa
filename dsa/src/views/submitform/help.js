import React from "react";
import Select from "react-select";

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
          <div className="alert alert-danger">{this.props.error}</div>
        )}
      </div>
    );
  }
}

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
        <label htmlFor="course_section">Select your Course and Section</label>
        <Select
          id="course_section"
          options={this.props.courses}
          multi={false}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div className="alert alert-danger">{this.props.error}</div>
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

/*--------   debug method  ----------------*/
const DisplayFormikState = props => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }}>Helper</h3>
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem"
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);
/*--------   end of debug method  ----------------*/
export { FacultySelect, CourseSelect };

export { DisplayFormikState };
