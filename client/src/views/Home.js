import React, { Component } from 'react';

import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import Instructions from "../components/home/Instructions";
import SocialMedia from "../components/home/SocialMedia";

export default class Home extends Component {
  render() {
    return (
      <div id="home-container">
        <section id="hero">
          <Hero />
        </section>
        <section id="intro">
          <Intro />
        </section>
        <section id="instructions">
          <Instructions />
        </section>
        <section id="social-media">
          <SocialMedia />
        </section>
      </div>
    );
  }
}
