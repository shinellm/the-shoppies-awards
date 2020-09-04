import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

import { FaCheck } from "react-icons/fa";

export default class SubmissionButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showSubmissionButton: false
        };

        this.onShowSubmissionButton = this.onShowSubmissionButton.bind(this);
    }

    onShowSubmissionButton(value) {
        this.setState({ showSubmissionButton: value });
    }

    render() {
        return (
            <div className="submission-button-container">
                {this.state.showSubmissionButton === false ? '' :
                    <Alert className="submission-notification" variant="success">
                        <p>Submit your movie nominations!</p>
                        <Button variant="success" onClick={() => console.log(this.state.personalNominations)}>{<FaCheck />}<p>Submit</p></Button>
                    </Alert>
                }
            </div>
        )
    }
}