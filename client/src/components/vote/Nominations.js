import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaTimes } from "react-icons/fa";

import SubmissionAlert from "./SubmissionAlert";
import SubmissionButton from "./SubmissionButton";

export default class Nominations extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            personalNominations: this.props.personalNominations,
            nominationLimit: this.props.nominationLimit,
            removeNominatedMovie: this.props.removeNominatedMovie
        };

        this.onNominateMovie = this.onNominateMovie.bind(this);
        this.onRemoveNominatedMovie = this.onRemoveNominatedMovie.bind(this);
        this.createNominationCard = this.createNominationCard.bind(this);
    }

    onNominateMovie() {
        let nominations = this.state.personalNominations;
        
        if (nominations.length === this.state.nominationLimit) {
            this.submissionAlert.onShowSubmissionBanner(true);
            this.submissionButton.onShowSubmissionButton(true);
        }
    }

    onRemoveNominatedMovie(movie) {
        this.state.removeNominatedMovie(movie);

        let nominations = this.state.personalNominations;

        if (nominations.length !== this.state.nominationLimit) {
            this.submissionAlert.onShowSubmissionBanner(false);
            this.submissionButton.onShowSubmissionButton(false);
        }
    }

    createNominationCard(nomination) {
        return (
            <Col key={`nominations-${nomination.imdbID}`} lg={2} md={3} sm={6} xs={12}>
                <Card className="nomination-card">
                    <div className="cover">
                            <Button className="remove-nomination" variant="light" onClick={() => this.onRemoveNominatedMovie(nomination)}>
                                {<FaTimes />}
                            </Button>
                            <div className="cover-image">
                                <div className="nomination-image-overlay"></div>
                                <Card.Img className="nomination-image" src={nomination.Poster}/>
                            </div>
                        <Card.Title className="nomination-title">{nomination.Title}</Card.Title>
                    </div>
                </Card>
            </Col>
        )
    }

    render() {
        return (
            <div className="personal-nominations-container">
                <SubmissionAlert ref={submissionAlert => this.submissionAlert = submissionAlert}/>
                {(this.state.personalNominations.length === 0) ? '' :
                <Card className="personal-movie-nominations">
                    <Card.Body>
                        <Card.Title>Your Movie Nominations ({this.state.personalNominations.length})</Card.Title>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <SubmissionButton ref={submissionButton => this.submissionButton = submissionButton}/>
                            </Col>
                            {this.state.personalNominations.map((nomination) => {
                                return this.createNominationCard(nomination);
                            })}
                        </Row>
                    </Card.Body>
                </Card>
                }
            </div>
        )
    }
}