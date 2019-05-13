import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { List_item } from "../../components/list-item";
import axios from "axios";

class Listing extends React.Component {
  state = { items: [] };
  async Taskinfo(insturctor_email) {
    //use the instructor email to get the corresponding task information
    var url = `http://localhost:8080/api/task_search/${insturctor_email}`;
    const response = await axios.post(url);
    this.setState({ items: response.data.data });
  }

  componentDidMount() {
    //function called when paged loaded
    this.Taskinfo(this.props.match.params.email);
  }

  render() {
    return (
      <div className="container">
        <List items={this.state.items} />,
      </div>
    );
  }
}

function List(props) {
  const items = props.items;
  const listItems = items.map(item => <List_item item={item} />);
  return <div className="container">{listItems}</div>;
}

export default Listing;
