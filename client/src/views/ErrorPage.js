import React, { Component } from 'react';
import { Card, Alert } from 'react-bootstrap';

import { FaTimes } from "react-icons/fa";

export default class ErrorPage extends Component {
    constructor() {
        super();
        this.state = {

        };

    }

    render() {
        return (
            <div className="error-container">
                <Card className="error-card">
                    <Card.Body>
                        <Alert className="error-header" variant="danger">
                            <div className="error"><FaTimes /></div>
                            <Alert.Heading>
                            Nominations Failed to Submit
                            </Alert.Heading>
                        </Alert>
                        <Card.Text>
                        Unfortunately, an error has occurred while processing your submission. Please try to 
                        visit the voting page and resumbit your nominations at a later time.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}