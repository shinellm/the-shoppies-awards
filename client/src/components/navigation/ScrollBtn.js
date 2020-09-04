import React, { Component } from "react";
import classNames from "classnames";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export default class ScrollBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetId: props.targetId,
      behavior: props.behavior,
      iconType: props.iconType,
      shiftUp: false,
      showButton: false
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Detect when the scroll up button should appear
  handleScroll() {
    let showButton = this.state.showButton;

    if (!showButton) {
      if (window.scrollY > 90) {
        this.setState({
          showButton: true
        });
      }
    } else {
      if (window.scrollY < 90) {
        this.setState({
          showButton: false
        });
      }
    }

    let shiftUp = this.state.shiftUp;
    let targetDiv = document.getElementsByTagName("FOOTER")[0];
    let button = document.getElementById("scroll-btn");
    let btnMarginBottom = window.getComputedStyle(button).marginBottom;
    btnMarginBottom = parseFloat(btnMarginBottom);

    if (!shiftUp) {
      if ((window.innerHeight + window.scrollY) > (targetDiv.offsetTop + btnMarginBottom)) {
        this.setState({
          shiftUp: true
        });
      }
    } else {
      if ((window.innerHeight + window.scrollY) < (targetDiv.offsetTop + btnMarginBottom)) {
        this.setState({
          shiftUp: false
        });
      }
    }
  }

  // If a targetId was supplied, scroll to target; else scroll to top of page
  handleClick() {
    let targetId = this.state.targetId;
    let behavior = this.state.behavior || "auto";

    if (targetId !== null && targetId !== undefined && targetId.trim().length > 0) {
      let targetDiv = document.getElementById("" + targetId);
      targetDiv.scrollIntoView({ behavior: behavior });
    } else {
      window.scrollTo({ top: 0, behavior: behavior })
    }
  }

  render() {
    const classes = classNames({
        circle: true, // always add this class
        active: this.state.showButton, // only add this class if the state says so
        shift: this.state.shiftUp 
    });

    const arrows = {
        "arrow-up" : <FaArrowUp className="circle-arrow"/>,
        "arrow-down" : <FaArrowDown className="circle-arrow"/>
    };

    return (
      <button type="button" name="scroll top" id="scroll-btn" className={classes} onClick={this.handleClick} aria-label="scroll top">
        <span className="circle circle-top"></span>
        {arrows[this.state.iconType]}
        <span className="circle circle-bottom"></span>
      </button>
    );
  }
}
