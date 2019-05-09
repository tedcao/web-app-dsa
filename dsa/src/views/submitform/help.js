import React from "react";
import Select from "react-select";
import Thumb from "../thumb";

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

class ListThumb extends React.Component {
  render() {
    return this.props.files.map((file, i) => <Thumb key={i} file={file} />);
  }
}

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
      <br />
      <strong>File</strong> =>{" "}
      {JSON.stringify(
        {
          // fileName: props.values.file.name,
          // type: props.values.file.type,
          // size: `${props.values.file.size} bytes`,
          // fileName2: props.values.file2.name,
          // type2: props.values.file2.type,
          // size2: `${props.values.file2.size} bytes`,
          // fileName3: props.values.file3.name,
          // type3: props.values.file3.type,
          // size3: `${props.values.file3.size} bytes`
          files: props.values.files.map(file => ({
            fileName: file.name,
            type: file.type,
            size: `${file.size} bytes`
          }))
        },
        null,
        2
      )}
    </pre>
  </div>
);
/*--------   end of debug method  ----------------*/
export { FacultySelect, CourseSelect, ListThumb };

export { DisplayFormikState };
