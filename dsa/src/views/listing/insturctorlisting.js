import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ListItem } from "../../components/list-item";
import axios from "axios";

class InsturctorListing extends React.Component {
  state = { items: [] };
  async Taskinfo(insturctor_email, encryptcode) {
    //use the instructor email to get the corresponding task information
    var url = `http://localhost:8080/api/instructor/${insturctor_email}&${encryptcode}`;
    const response = await axios.post(url);
    this.setState({ items: response.data.data });
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
      // return x.modified === y.modified ? 0 : x ? -1 : 1;
    });
    this.setState({ items: newItems });
  }

  render() {
    return (
      <div className="container">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
            onChange={e => {
              this.sortModified(e);
            }}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            Approve
          </label>
        </div>
        <List items={this.state.items} />,
      </div>
    );
  }
}

function List(props) {
  const items = props.items;
  const listItems = items.map(item => <ListItem key={item._id} item={item} />);
  return <div className="container">{listItems}</div>;
}

export default InsturctorListing;
