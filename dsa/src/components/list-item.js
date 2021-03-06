import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./list-item.css";
var config = require("../config");
var fileRequestPrefix = config.urlPrefix + "file/";

class ListItem extends React.Component {
  state = {
    item: this.props.item,
    item_id: this.props.item._id,
    admin: this.props.admin,
    aggrement: ""
  };
  //check aggrement and translate true/false to yes/no
  componentDidMount() {
    if (this.state.item.aggrement) {
      this.setState({ aggrement: "Yes" });
    } else {
      this.setState({ aggrement: "No" });
    }
  }

  render() {
    return (
      <div className="row item" key={this.key}>
        <div className="col-lg-10 col-sm-12">
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Request ID : </div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item._id}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Reference Number : </div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item.reference_number}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Student ID : </div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item.student_id}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Student Name : </div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item.name}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Student Email : </div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item.student_email}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Course :</div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item.course}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Section : </div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item.section}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Home Faculty : </div>
            <div className="col-lg-6 col-sm-12 ">
              <span>{this.state.item.home_faculty}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Instructor Email : </div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item.instructor}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Supervisor Email : </div>
            <div className="col-lg-3 col-sm-12 ">
              <span>{this.state.item.supervisor}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">Submitted Date : </div>
            <div className="col-lg-6 col-sm-12 ">
              <span>{this.state.item.create_date}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12  name">
              Registered with Counselling/Disability services :
            </div>
            <div className="col-lg-6 col-sm-12 ">
              <span>{this.state.aggrement}</span>
            </div>
          </div>
          {fileList(this.state.item)}
        </div>
        <ApproveButton
          // modified={this.state.item.modified}
          // approve={this.state.item.approve}
          state={this.state.item.state}
          id={this.state.item._id}
          admin={this.state.admin}
        />
      </div>
    );
  }
}

class ApproveButton extends React.Component {
  state = {
    // modified: this.props.modified,
    // approve: this.props.approve,
    state: this.props.state,
    id: this.props.id,
    admin: this.props.admin
  };
  //function - call approve api
  async handleApproveRequest(e) {
    var approveRequest = config.urlPrefix + "approve/" + this.props.id;
    e.preventDefault();
    const response = await axios.post(approveRequest);
    if (response.data.data === true) {
      //change the state after success feedback send back
      this.setState({ state: "approved" });
    } else {
      console.log("Bad connection");
    }
  }
  //function - call deny api
  async handleDenyRequest(e) {
    var denyRequest = config.urlPrefix + "deny/" + this.props.id;
    e.preventDefault();
    const response = await axios.post(denyRequest);
    if (response.data.data === true) {
      //change the state after success feedback send back
      this.setState({ state: "denied" });
    } else {
      console.log("Bad connection");
    }
  }
  //function - call overwrite api (undo)
  async handleOverwrite(e) {
    var overwriteRequest = config.urlPrefix + "overwrite/" + this.props.id;
    e.preventDefault();
    const response = await axios.post(overwriteRequest);
    if (response.data.data === true) {
      //change the state after success feedback send back
      this.setState({ state: "verified" });
    } else {
      console.log("Bad connection");
    }
  }

  render() {
    // var modified = this.state.modified;
    var state = this.state.state;
    var admin = this.state.admin;
    if (admin) {
      if (state === "verified") {
        return (
          <div className="col-lg-2 col-sm-12 ">
            <button
              type="button"
              className="btn btn-primary item_button"
              onClick={e => {
                this.handleApproveRequest(e);
              }}
            >
              Approve
            </button>
            <button
              type="button"
              className="btn btn-secondary item_button"
              onClick={e => {
                this.handleDenyRequest(e);
              }}
            >
              Deny
            </button>
          </div>
        );
      } else if (state === "approved") {
        return (
          <div className="col-lg-2 col-sm-12 ">
            <button
              type="button"
              className="btn btn-success active item_button"
              disabled
            >
              Request Approved
            </button>
            <button
              type="button"
              className="btn btn-outline-warning item_button"
              onClick={e => {
                this.handleOverwrite(e);
              }}
            >
              Undo
            </button>
          </div>
        );
      } else {
        return (
          <div className="col-lg-2 col-sm-12 ">
            <button
              type="button"
              className="btn btn-danger active item_button"
              disabled
            >
              Request Denied
            </button>
            <button
              type="button"
              className="btn btn-outline-warning item_button"
              onClick={e => {
                this.handleOverwrite(e);
              }}
            >
              Undo
            </button>
          </div>
        );
      }
    } else {
      if (state === "verified") {
        return (
          <div className="col-lg-2 col-sm-12 ">
            <button
              type="button"
              className="btn btn-primary item_button"
              onClick={e => {
                this.handleApproveRequest(e);
              }}
            >
              Approve
            </button>
            <button
              type="button"
              className="btn btn-secondary item_button"
              onClick={e => {
                this.handleDenyRequest(e);
              }}
            >
              Deny
            </button>
          </div>
        );
      } else if (state === "approved") {
        return (
          <div className="col-lg-2 col-sm-12 ">
            <button
              type="button"
              className="btn btn-success active item_button"
              disabled
            >
              Request Approved
            </button>
          </div>
        );
      } else {
        return (
          <div className="col-lg-2 col-sm-12 ">
            <button
              type="button"
              className="btn btn-danger active item_button"
              disabled
            >
              Request Denied
            </button>
          </div>
        );
      }
    }
  }
}

//show the files name and description if exists
function fileList(item) {
  var objectValue = JSON.parse(item.files);
  var file1name, file2name, file3name; //file name initial
  var file1href, file2href, file3href; //file link initial
  var file1des, file2des, file3des; //file description initial

  if (
    objectValue.file !== undefined &&
    objectValue.file[1] !== undefined &&
    objectValue.file[2] !== undefined
  ) {
    file1name = objectValue.file[0].originalname;
    file2name = objectValue.file[1].originalname;
    file3name = objectValue.file[2].originalname;
    file1href = fileRequestPrefix + objectValue.file[0].filename;
    file2href = fileRequestPrefix + objectValue.file[1].filename;
    file3href = fileRequestPrefix + objectValue.file[2].filename;
    file1des = item.file1_des;
    file2des = item.file2_des;
    file3des = item.file3_des;
    return (
      <div className="row">
        <div className="col-lg-3 col-sm-12  name">First File : </div>
        <div className="col-lg-5 col-sm-12 ">
          <a href={file1href}>{file1name}</a>
        </div>
        <div className="col-lg-4 col-sm-12  description">{file1des}</div>
        <div className="col-lg-3 col-sm-12  name">Second File : </div>
        <div className="col-lg-5 col-sm-12 ">
          <a href={file2href}>{file2name}</a>
        </div>
        <div className="col-lg-4 col-sm-12  description">{file2des}</div>
        <div className="col-lg-3 col-sm-12  name">Third File : </div>
        <div className="col-lg-5 col-sm-12 ">
          <a href={file3href}>{file3name}</a>
        </div>
        <div className="col-lg-4 col-sm-12  description">{file3des}</div>
      </div>
    );
  } else if (
    objectValue.file !== undefined &&
    objectValue.file[1] !== undefined
  ) {
    file1name = objectValue.file[0].originalname;
    file2name = objectValue.file[1].originalname;
    file1href = fileRequestPrefix + objectValue.file[0].filename;
    file2href = fileRequestPrefix + objectValue.file[1].filename;
    file1des = item.file1_des;
    file2des = item.file2_des;
    return (
      <div className="row">
        <div className="col-lg-3 col-sm-12  name">First File : </div>
        <div className="col-lg-5 col-sm-12 ">
          <a href={file1href}>{file1name}</a>
        </div>
        <div className="col-lg-4 col-sm-12  description">{file1des}</div>
        <div className="col-lg-3 col-sm-12  name">Second File : </div>
        <div className="col-lg-5 col-sm-12 ">
          <a href={file2href}>{file2name}</a>
        </div>
        <div className="col-lg-4 col-sm-12  description">{file2des}</div>
      </div>
    );
  } else if (objectValue.file !== undefined) {
    file1name = objectValue.file[0].originalname;
    file1href = fileRequestPrefix + objectValue.file[0].filename;
    file1des = item.file1_des;
    return (
      <div className="row">
        <div className="col-lg-3 col-sm-12  name">First File : </div>
        <div className="col-lg-5 col-sm-12 ">
          <a href={file1href}>{file1name}</a>
        </div>
        <div className="col-lg-4 col-sm-12  description">{file1des}</div>
      </div>
    );
  } else {
    console.log("information undefined");
  }
}

export { ListItem };
