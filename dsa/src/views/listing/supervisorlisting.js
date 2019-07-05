import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ListItem } from "../../components/list-item";
import axios from "axios";
import { Link } from "react-router-dom";
var config = require("../../config");

class SupervisorListing extends React.Component {
  state = { items: [], search: "" };
  async Taskinfo(supervisor_email, encryptcode) {
    //use the instructor email to get the corresponding task information
    var url = `${
      config.urlPrefix
    }supervisor/${supervisor_email}&${encryptcode}`;
    const response = await axios.post(url);
    const tempItems = response.data.data;
    let filtedPendingItem = tempItems.filter(item => {
      if (item.state !== "pending") {
        return true; //keep the record
      } else {
        return false; //drop the record
      }
    });

    this.setState({ items: filtedPendingItem });
  }

  //set up search state when search text changed
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
      if (x.state === "verified" && x.state !== y.state) {
        return -1; //x then y,
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
      if (x.state === "approved" && x.state !== y.state) {
        return -1; //x then y,
      } else {
        return 0; // do not change
      }
    });
    this.setState({ items: newItems });
  }
  //denied > approved > pending
  sortDenied(e) {
    const newItems = this.state.items;
    newItems.sort(function(x, y) {
      if (x.state === "denied" && x.state !== y.state) {
        return -1; //x then y,
      } else {
        return 0; // do not change
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
        item._id.indexOf(this.state.search) !== -1 ||
        item.reference_number.toString().indexOf(this.state.search) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    });
    return (
      <div className="">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <Link className="nav-link" to="/submitform">
              Student Submit From
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/uploadStudentData">
              Upload Data
            </Link>
          </li>
        </ul>
        <div className="row">
          <div className="col-lg-3 col-sm-12">Sort the list based on:</div>
          <div className="form-check form-check-inline col-lg-2 col-sm-12">
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
          <div className="form-check form-check-inline col-lg-2 col-sm-12">
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
          <div className="form-check form-check-inline col-lg-2 col-sm-12">
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
          <label
            className="search-title col-lg-5 col-sm-12"
            htmlFor="course_search"
          >
            Please enter the
            <strong>
              {" "}
              course-name / student-number / instructor-email / reference-number
              / request-id
            </strong>{" "}
            you want to filter out :
          </label>
          <input
            className="form-control col-lg-7 col-sm-12"
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
