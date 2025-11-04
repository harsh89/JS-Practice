import React, { Component } from "react";
import ApiHelper from "./ApiHelper";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.apiHelper = new ApiHelper();
    this.state = {
      users: [],
      loading: false,
      query: "",
    };
  }

  componentDidMount() {
    try {
      this.setState({ loading: true });

      this.apiHelper
        .fetchData("https://jsonplaceholder.typicode.com/users")
        .then(async (data) => {
          await new Promise((data) => setTimeout(data, 3000));
          this.setState({ users: data, loading: false });
        });
    } catch (error) {
      console.log(error);
    }
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <ul>
          {this.state.users
            ?.filter((u) => u.name.toLowerCase().includes(this.state.query))
            ?.map((user) => (
              <li key={user.id} onClick={() => alert(user.email)}>
                {user.name}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
