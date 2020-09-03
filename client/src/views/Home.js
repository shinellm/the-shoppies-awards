import React, { Component } from 'react';
import logo from "../images/svg/reactlogo.svg";

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{background: "radial-gradient(#525252, #131313)"}}>
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
          {/* <br></br>
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
          <p>{this.state.responseToPost}</p> */}
        </header>
      </div>
    );
  }
}
