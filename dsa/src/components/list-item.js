import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./list-item.css";
var fileRequestPrefix = "http://localhost:8080/api/file/";

class ListItem extends React.Component {
  render() {
    return (
      <div className="row item" key={this.key}>
        <div className="col-10">
          <div className="row">
            <div className="col-3 name">Student ID : </div>
            <div className="col-3">
              <span>{this.props.item.student_id}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 name">Student Name : </div>
            <div className="col-3">
              <span>{this.props.item.name}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 name">Course :</div>
            <div className="col-3">
              <span>{this.props.item.course}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 name">Section : </div>
            <div className="col-3">
              <span>{this.props.item.section}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 name">Home Faculty : </div>
            <div className="col-6">
              <span>{this.props.item.home_faculty}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 name">Instructor Email : </div>
            <div className="col-3">
              <span>{this.props.item.instructor}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 name">Supervisor Email : </div>
            <div className="col-3">
              <span>{this.props.item.supervisor}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 name">Submitted Date : </div>
            <div className="col-6">
              <span>{this.props.item.create_date}</span>
            </div>
          </div>
          {fileList(this.props.item)}
        </div>
        <ApproveButton
          modified={this.props.item.modified}
          approve={this.props.item.approve}
          id={this.props.item._id}
        />
      </div>
    );
  }
}

class ApproveButton extends React.Component {
  async handleApproveRequest(e) {
    var approveRequest = "http://localhost:8080/api/approve/" + this.props.id;
    e.preventDefault();
    const response = await axios.post(approveRequest);
    if (response.data.data === true) {
      window.location.reload();
    } else {
      console.log("Bad connection");
    }

    // console.log(this.props.id);
  }
  async handleDenyRequest(e) {
    var denyRequest = "http://localhost:8080/api/deny/" + this.props.id;
    e.preventDefault();
    const response = await axios.post(denyRequest);
    if (response.data.data === true) {
      window.location.reload();
    } else {
      console.log("Bad connection");
    }

    // console.log(this.props.id);
    // window.location.reload();
  }

  render() {
    // get modified and approve value
    var modified = this.props.modified;
    var approve = this.props.approve;
    if (!modified) {
      return (
        <div className="col-2">
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
            Denied
          </button>
        </div>
      );
    } else if (modified && approve) {
      return (
        <div className="col-2">
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
        <div className="col-2">
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
        <div className="col-3 name">First File : </div>
        <div className="col-5">
          <a href={file1href}>{file1name}</a>
        </div>
        <div className="col-4 description">{file1des}</div>
        <div className="col-3 name">Second File : </div>
        <div className="col-5">
          <a href={file2href}>{file2name}</a>
        </div>
        <div className="col-4 description">{file2des}</div>
        <div className="col-3 name">Third File : </div>
        <div className="col-5">
          <a href={file3href}>{file3name}</a>
        </div>
        <div className="col-4 description">{file3des}</div>
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
        <div className="col-3 name">First File : </div>
        <div className="col-5">
          <a href={file1href}>{file1name}</a>
        </div>
        <div className="col-4 description">{file1des}</div>
        <div className="col-3 name">Second File : </div>
        <div className="col-5">
          <a href={file2href}>{file2name}</a>
        </div>
        <div className="col-4 description">{file2des}</div>
      </div>
    );
  } else if (objectValue.file !== undefined) {
    file1name = objectValue.file[0].originalname;
    file1href = fileRequestPrefix + objectValue.file[0].filename;
    file1des = item.file1_des;
    return (
      <div className="row">
        <div className="col-3 name">First File : </div>
        <div className="col-5">
          <a href={file1href}>{file1name}</a>
        </div>
        <div className="col-4 description">{file1des}</div>
      </div>
    );
  } else {
    console.log("information undefined");
  }
}

export { ListItem };
