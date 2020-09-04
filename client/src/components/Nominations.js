import React, { Component } from 'react';
import { Card, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

export default class Nominations extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showSubmissionBanner: false,
            showSubmissionButton: false,
            personalNominations: this.props.personalNominations,
            nominationLimit: this.props.nominationLimit,
            removeNominatedMovie: this.props.removeNominatedMovie
        };

        this.onShowSubmissionBanner = this.onShowSubmissionBanner.bind(this);
        this.onShowSubmissionButton = this.onShowSubmissionButton.bind(this);
        this.onNominateMovie = this.onNominateMovie.bind(this);
        this.onRemoveNominatedMovie = this.onRemoveNominatedMovie.bind(this);
        this.createNominationCard = this.createNominationCard.bind(this);
    }

    onShowSubmissionBanner(value) {
        this.setState({ showSubmissionBanner: value });
    }

    onShowSubmissionButton(value) {
        this.setState({ showSubmissionButton: value });
    }

    onNominateMovie() {
        let nominations = this.state.personalNominations;
        
        if (nominations.length === this.state.nominationLimit) {
            this.onShowSubmissionBanner(true);
            this.onShowSubmissionButton(true);
        }
        else {
            this.onShowSubmissionBanner(false);
            this.onShowSubmissionButton(false);
        }
    }

    onRemoveNominatedMovie(movie) {
        this.state.removeNominatedMovie(movie);

        let nominations = this.state.personalNominations;

        if (nominations.length !== this.state.nominationLimit) {
            this.onShowSubmissionBanner(false);
            this.onShowSubmissionButton(false);
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
                {(this.state.personalNominations.length === 0) ? '' :
                <Card className="personal-movie-nominations">
                    <Card.Body>
                        <Card.Title>Your Movie Nominations ({this.state.personalNominations.length})</Card.Title>
                        <Row>
                            {this.state.showSubmissionButton === false ? '' :
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Alert className="submission-notification" variant="success">
                                        <p>Submit your movie nominations!</p>
                                        <Button variant="success" onClick={() => console.log(this.state.personalNominations)}>{<FaCheck />}<p>Submit</p></Button>
                                    </Alert>
                                </Col>
                            }
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