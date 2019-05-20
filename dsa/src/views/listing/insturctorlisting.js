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
  const listItems = items.map(item => <ListItem key={item._id} item={item} />);
  return <div className="container">{listItems}</div>;
}

export default InsturctorListing;
