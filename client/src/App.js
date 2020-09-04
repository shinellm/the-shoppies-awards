import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import ScrollButton from './components/navigation/ScrollBtn';

import Home from './views/Home';
import Vote from './views/Vote';
import Nominees from './views/Nominees';
import NotFound from './views/404NotFound';

class App extends Component {
  render() {
    return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/nominees" component={Nominees} />
        <Route component={NotFound} />
      </Switch>

      <ScrollButton targetId="root" behavior="smooth" iconType="arrow-up" />

      <Footer />
    </Router>
    )
  }
}

export default App;