import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class SubmissionAlert extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showSubmissionBanner: false
        };

        this.onShowSubmissionBanner = this.onShowSubmissionBanner.bind(this);
    }

    onShowSubmissionBanner(value) {
        this.setState({ showSubmissionBanner: value });
    }
    
    render() {
        return(
            <div className="submission-alert-container">
                {this.state.showSubmissionBanner === false ? '' :
                    <div className="alert-container">
                        <Alert variant="info" onClose={() => this.onShowSubmissionBanner(false)} dismissible>
                            <Alert.Heading>Max Movie Nominations Reached</Alert.Heading>
                            <p>
                            You've added {this.state.nominationLimit} movies to your list of nominations. Please submit your movie nominations list or 
                            edit your previous nominations shown at the top of the page.
                            </p>
                        </Alert>
                    </div>
                }
            </div>
        )
    }
}