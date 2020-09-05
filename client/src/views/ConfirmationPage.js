import React, { Component } from 'react';
import { Breadcrumb, Card, Alert } from 'react-bootstrap';

import { FaCheck } from "react-icons/fa";

export default class ConfirmationPage extends Component {
    constructor() {
        super();
        this.state = {

        };

    }

    render() {
        return (
            <div id="confirmation-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/vote">Vote</Breadcrumb.Item>
                    <Breadcrumb.Item active>Confirmation</Breadcrumb.Item>
                </Breadcrumb>
                <Card className="confirmation-card">
                    <Card.Body>
                        <Alert className="confirmation-header" variant="success">
                            <div className="success"><FaCheck /></div>
                            <Alert.Heading>
                            Nominations Submitted Successfully
                            </Alert.Heading>
                        </Alert>
                        <Card.Text>
                        Thanks for casting your vote and helping your favorite movies get the 
                        chance to win The Shoppies Award! While we continue to compile our list 
                        of movie nominees, feel free to check out the Nominees page and see who's
                        in the top 10 ranking.
                        </Card.Text>
                        <hr />
                        <div className="share-on-social">
                            <Card.Text>
                            Share the voting link on social media so your friends can vote for their 
                            favorite movies too!
                            </Card.Text>
                            <div className="sharable-links"></div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}