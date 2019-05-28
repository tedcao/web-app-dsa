import React from "react";
//get the list of the file
//also able to show preview of image file, function disabled for now
export default class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    // const { loading, thumb } = this.state;
    const { loading } = this.state;
    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      // <img
      //   src={thumb}
      //   alt={file.name}
      //   className="img-thumbnail mt-2"
      //   height={200}
      //   width={200}
      // />
      <div>{file.name}</div>
    );
  }
}
