import React, { Component } from 'react';
import { CardGroup, Card } from 'react-bootstrap';

import { FaSearch } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";
import { FaAward } from "react-icons/fa";

export default class Instructions extends Component {
    render() {
        return (
            <div className="instructions-container">
                <h2 className="instructions-header">How to Nominate Movies</h2>
                <CardGroup className="set-of-instructions">
                    <Card className="instruction-card">
                        <Card.Body>
                            <div className="instruction-icon">
                                <FaSearch />
                                <div className="icon-background"></div>
                            </div>
                            <Card.Title>Search</Card.Title>
                            <Card.Text>Search through our extensive list of movie titles and find your favorite movies.</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="instruction-card">
                        <Card.Body>
                            <div className="instruction-icon">
                                <FaVoteYea />
                                <div className="icon-background"></div>
                            </div>
                            <Card.Title>Vote</Card.Title>
                            <Card.Text>Mix and match 5 movie titles to build your movie nomination list.</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="instruction-card">
                        <Card.Body>
                            <div className="instruction-icon">
                                <FaAward />
                                <div className="icon-background"></div>
                            </div>
                            <Card.Title>Nominate</Card.Title>
                            <Card.Text>Submit your vote and nominate your picks for a chance to win The Shoppies Award.</Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
        )
    }
}