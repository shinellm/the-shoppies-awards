import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import axios from "axios";

import { Redirect } from "react-router-dom";

import { FaCheck } from "react-icons/fa";

export default class SubmissionButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            errorRedirect: false,
            confirmationRedirect: false,
            showSubmissionButton: false,
            personalNominations: this.props.personalNominations
        };

        this.onShowSubmissionButton = this.onShowSubmissionButton.bind(this);
        this.handleSubmitMovieNomination = this.handleSubmitMovieNomination.bind(this);
    }

    onShowSubmissionButton(value) {
        this.setState({ showSubmissionButton: value });
    }

    async handleSubmitMovieNomination(event) {
        event.preventDefault();
        
        await axios.post('/api/nominees', this.state.personalNominations)
        .then(res => {
            this.setState({ confirmationRedirect: true });
        })
        .catch(err => {
            this.setState({ errorRedirect: true });
            console.log(err);
        })
    }

    render() {
        if (this.state.confirmationRedirect) {
            return <Redirect to="/vote/confirmation" />
        }
        else if (this.state.errorRedirect) {
            return <Redirect to="/vote/error" />
        }
        return (
            <div className="submission-button-container">
                {this.state.showSubmissionButton === false ? '' :
                    <Alert className="submission-notification" variant="success">
                        <p>Submit your movie nominations!</p>
                        <Button variant="success" onClick={this.handleSubmitMovieNomination}>{<FaCheck />}<p>Submit</p></Button>
                    </Alert>
                }
            </div>
        )
    }
}