import React, { Component } from 'react';

export default class Hero extends Component {
    render() {
        return (
            <div className="hero-container">
                <div className="hero-header">
                    <h1>The Shoppies Awards</h1>
                    <p>A movie awards show that puts the deciding power into the hands of the people</p>
                </div>
                <div className="hero-background">                    
                    <div className="circle-one"></div>
                    <div className="circle-two"></div>
                    <div className="filter"></div>
                    <img className="hero-image" src={'../../images/theather.jpg'}/>
                </div>
            </div>
        )
    }
}