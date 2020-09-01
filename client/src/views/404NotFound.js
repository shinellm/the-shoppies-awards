import React, { Component } from 'react';
import notFound from "../images/svg/sand.svg";

export default class NotFound extends Component {
    render() {
        return (
            <div className="notFound">
                <h1>404 Page Not Found</h1>
                <p>You have navigated to a page that doesn't exist</p>
                <img src={notFound} alt="404image" />
            </div>
        )
    }
};