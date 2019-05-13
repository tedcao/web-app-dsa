import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./list-item.css";

class List_item extends React.Component {
  render() {
    console.log(this.props.item);
    return (
      <div className="row item">
        <div className="col-10">
          <div className="name">
            Student ID : <span>{this.props.item.student_id}</span>
          </div>
          <div className="name">
            Course : <span>{this.props.item.course}</span>
          </div>
          <div className="name">
            Section : <span>{this.props.item.section}</span>
          </div>
          <div className="name">
            Home Faculty : <span>{this.props.item.home_faculty}</span>
          </div>
          <div className="name">
            Instructor Email : <span>{this.props.item.instructor}</span>
          </div>
        </div>
        {/* <div className="col-6">
          <div className="name">
            First File Description : <span>{this.props.item.file1_des}</span>
          </div>
          <div className="name">
            Second File Description : <span>{this.props.item.file2_des}</span>
          </div>
          <div className="name">
            Third Description : <span>{this.props.item.file3_des}</span>
          </div>
        </div> */}
        <div class="col-2">
          <a href="#">
            <button type="button" class="btn btn-primary item_button">
              Approve
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export { List_item };
