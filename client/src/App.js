import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import NotFound from './views/404NotFound';

class App extends Component {
  render() {
    return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>

      <Footer />
    </Router>
    )
  }
}

export default App;