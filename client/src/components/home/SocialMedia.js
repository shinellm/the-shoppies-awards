import React, { Component } from 'react';
import SocialMediaBtns from '../notification/SocialMediaBtns';

export default class SocialMedia extends Component {
    render() {
        return (
            <div className="social-media-container">
                <div className="social-media">
                    <h2 className="social-media-header">Share the excitment on social media and 
                    help your favorite movie win The Shoppies Award!</h2>
                    <SocialMediaBtns />
                </div>
            </div>
        )
    }
}