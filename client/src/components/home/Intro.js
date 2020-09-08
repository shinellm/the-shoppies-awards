import React, { Component } from 'react';

export default class Intro extends Component {
    render() {
        return (
            <div className="intro-container">
                <div className="intro">
                    <h2 className="intro-header">Nominate your favorite movies for the upcoming Shoppies Awards!</h2>
                    <p className="intro-text">Shopify has branched out into movie awards and will be hosting the upcoming 
                    Shoppies Awards: Movie Awards for Entrepreneurs. Vote by nominating your top 5 favorite movies and help them take 
                    home a big win! Once you've submitted your vote, you can head over to the Nominees section and see what movies are 
                    at the top ranks. Let your voice be heard!</p>
                </div>
            </div>
        )
    }
}