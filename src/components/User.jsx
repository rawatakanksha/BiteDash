import React from "react";
class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "dummy",
        location: "default",
      },
    };
    console.log(this.props.child, "constructor lifecycle");
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/rawatakanksha");
    const json = await data.json();
    console.log(json, " componentDidMont lifecycle");
    this.setState({
      userInfo: json,
    });
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="border-2 border-b-gray-500">
        <h1>Name:{name}</h1>
        <h2>Location:{location || "NA"}</h2>
        <img src={avatar_url}></img>
      </div>
    );
  }
}

export default User;
