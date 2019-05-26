import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ListItem } from "../../components/list-item";
import axios from "axios";

class InsturctorListing extends React.Component {
  state = { items: [], search: "" };
  async Taskinfo(insturctor_email, encryptcode) {
    //use the instructor email to get the corresponding task information
    var url = `http://localhost:8080/api/instructor/${insturctor_email}&${encryptcode}`;
    const response = await axios.post(url);
    this.setState({ items: response.data.data });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  componentDidMount() {
    //function called when paged loaded
    this.Taskinfo(
      this.props.match.params.insturctor_email,
      this.props.match.params.encryptcode
    );
  }
  sortModified(e) {
    console.log("Approved");
    // 0 unchange, -1 x<, y , 1:  y < X
    const newItems = this.state.items;
    newItems.sort(function(x, y) {
      if (x.modified === y.modified) {
        if (x.approve === y.approve) {
          return 0;
        } else if (x.approve !== y.approve && x.approve === false) {
          return 1;
        } else {
          return -1;
        }
      } else if (x.modified !== y.modified && x.modified === true) {
        return 1;
      } else {
        return -1;
      }
    });
    this.setState({ items: newItems });
  }

  render() {
    let filtedItem = this.state.items.filter(item => {
      if (
        item.course.indexOf(this.state.search) !== -1 ||
        item.student_id.indexOf(this.state.search) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    });
    return (
      <div className="">
        <div className="row">
          <button
            className="btn btn-outline-primary col-3"
            id="sortbutton"
            onClick={e => {
              this.sortModified(e);
            }}
          >
            Click to Sort the List
          </button>
        </div>
        <div className="row">
          <label className="search-title col-5" htmlFor="course_search">
            Please enter the course-name/student-number you want to filter out :
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
          return <ListItem key={item._id} item={item} />;
        })}
      </div>
    );
  }
}
export default InsturctorListing;
