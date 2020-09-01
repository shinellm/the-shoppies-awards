import React, { Component } from 'react';
import axios from "axios";
import logo from "../images/svg/logo.svg";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      responseToPost: "",
    };
    this.onPostChange = this.onPostChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onPostChange(event) {
    this.setState({ post: event.target.value });
  }

  /*
    This is a mock GET request it will return the info in the POST request and the express route.
    It is a demonstration of an AJAX using the axios library
    */
  async componentDidMount() {
    const response = await axios.get("/api/");
    const body = await response;
    if (response.status !== 200) throw Error(body.message);
    this.setState({ response: response.express });

    return body;
  }

  /* 
    This is a mock POST request.
    It is a demonstration of an AJAX call using the fetch API
    */
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src={logo} alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <br></br>
          <p>Post to Backend Server</p>
          <form className="testForm" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="boilerplate_example">Message:</label>
              <input
                type="post"
                value={this.state.post}
                onChange={this.onPostChange}
              />
              <button type="submit">Submit</button>
            </div>
          </form>
          <p>{this.state.responseToPost}</p>
        </header>
      </div>
    );
  }
}
