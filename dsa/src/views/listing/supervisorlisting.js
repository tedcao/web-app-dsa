import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ListItem } from "../../components/list-item";
import axios from "axios";

class SupervisorListing extends React.Component {
  state = { items: [], search: "" };
  async Taskinfo(supervisor_email, encryptcode) {
    //use the instructor email to get the corresponding task information
    var url = `http://localhost:8080/api/supervisor/${supervisor_email}&${encryptcode}`;
    const response = await axios.post(url);
    this.setState({ items: response.data.data });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  componentDidMount() {
    //function called when paged loaded
    this.Taskinfo(
      this.props.match.params.supervisor_email,
      this.props.match.params.encryptcode
    );
  }
  //pending > approved > denied
  sortPending(e) {
    const newItems = this.state.items;
    newItems.sort(function(x, y) {
      if (x.modified === false && x.modified !== y.modified) {
        return -1; //x then y, x is not modified and y is modified
      } else {
        return 0; // do not change
      }
    });
    this.setState({ items: newItems });
  }
  //approve > denied > pending
  sortApproved(e) {
    const newItems = this.state.items;
    newItems.sort(function(x, y) {
      if (x.modified !== y.modified && x.modified === true) {
        return -1;
      } else if (
        x.modified === y.modified &&
        x.approve !== y.approve &&
        x.approve === true
      ) {
        return -1;
      } else {
        return 0;
      }
    });
    this.setState({ items: newItems });
  }
  //denied > approved > pending
  sortDenied(e) {
    const newItems = this.state.items;
    newItems.sort(function(x, y) {
      if (x.modified !== y.modified && x.modified === true) {
        return -1;
      } else if (
        x.modified === y.modified &&
        x.approve !== y.approve &&
        x.approve === false
      ) {
        return -1;
      } else {
        return 0;
      }
    });
    this.setState({ items: newItems });
  }

  render() {
    let filtedItem = this.state.items.filter(item => {
      if (
        item.course.indexOf(this.state.search) !== -1 ||
        item.student_id.indexOf(this.state.search) !== -1 ||
        item.instructor.indexOf(this.state.search) !== -1 ||
        item._id.indexOf(this.state.search) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    });
    return (
      <div className="">
        <div className="row">
          <div className="col-3">Sort the list based on:</div>
          <div className="form-check form-check-inline col-2">
            <input
              className="form-check-input"
              type="radio"
              name="sorOptions"
              id="pending"
              value="pending"
              onClick={e => {
                this.sortPending(e);
              }}
            />
            <label className="form-check-label" htmlFor="pending">
              Pending
            </label>
          </div>
          <div className="form-check form-check-inline col-2">
            <input
              className="form-check-input"
              type="radio"
              name="sorOptions"
              id="approved"
              value="approved"
              onClick={e => {
                this.sortApproved(e);
              }}
            />
            <label className="form-check-label" htmlFor="approved">
              Approved
            </label>
          </div>
          <div className="form-check form-check-inline col-2">
            <input
              className="form-check-input"
              type="radio"
              name="sorOptions"
              id="denied"
              value="denied"
              onClick={e => {
                this.sortDenied(e);
              }}
            />
            <label className="form-check-label" htmlFor="denied">
              Denied
            </label>
          </div>
        </div>
        <div className="row">
          <label className="search-title col-5" htmlFor="course_search">
            Please enter the
            <strong>
              {" "}
              course-name / student-number / instructor-email / reference-number
            </strong>{" "}
            you want to filter out :
          </label>
          <input
            className="form-control col-7"
            type="text"
            id="course_search"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>
        {filtedItem.map(item => {
          return <ListItem key={item._id} item={item} admin={true} />;
        })}
      </div>
    );
  }
}

export default SupervisorListing;
