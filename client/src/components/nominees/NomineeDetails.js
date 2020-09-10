import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import axios from "axios";

import { ReactComponent as Imdb } from "../../images/svg/imdbLogo.svg";
import { ReactComponent as Tomato } from "../../images/svg/rottenTomatoesLogo.svg";
import { ReactComponent as Metacritic } from "../../images/svg/metacriticLogo.svg";

export default class NomineeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNominee: {},
            selectedNomineeDetails: {},
            showNomineeDetails: false
        };

        this.onShowNomineeDetails = this.onShowNomineeDetails.bind(this);
        this.handleSearchNomineeDetails = this.handleSearchNomineeDetails.bind(this);
        this.setRatingIcon = this.setRatingIcon.bind(this);
    }

    onShowNomineeDetails(value) {
        this.setState({ showNomineeDetails: value });

        if (value === false) {
            this.setState({ selectedNominee: {} });
            this.setState({ selectedNomineeDetails: {} });
        }
    }

    async handleSearchNomineeDetails(nominee) {
        await axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${nominee['movie_imdbID']}&type=movie&plot=full&r=json`)
        .then(res => {
            const nomineeData = res.data;
            console.log('reponse', res);
            console.log('Nominee Details', nomineeData);

            // if (nomineeData.Response === "False") {
            //     this.onNoResultsFound(true);
            // }
            // else {
                this.onShowNomineeDetails(true);
                this.setState({ selectedNominee: nominee });
                this.setState({ selectedNomineeDetails: nomineeData });
            // }
        })
        .catch(err => {
            console.log(err);
        })
    };

    setRatingIcon(source) {
        console.log(source)
        switch (source) {
            case 'Metacritic':
                return <Metacritic />;
            case 'Rotten Tomatoes':
                return <Tomato />;
            default:
                return <Imdb />;
        }
    }

    render() {
        return (
            <div className="nominee-details-container">
                {Object.keys(this.state.selectedNomineeDetails).length === 0 ? '' :
                    <Modal size="lg" className="nominee-details-modal" aria-labelledby="nominee-details-title" centered show={this.state.showNomineeDetails} onHide={() => this.onShowNomineeDetails(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title id="nominee-details-title">{this.state.selectedNomineeDetails.Title} -- [{this.state.selectedNominee.movie_votes} nominations]</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col className="column1" lg={5} md={12} sm={12} xs={12}>
                                    <img alt={this.state.selectedNominee.Title} src={this.state.selectedNomineeDetails.Poster === 'N/A' ? '../../images/placeholder.png' : this.state.selectedNomineeDetails.Poster} />   
                                </Col>
                                <Col className="column2" lg={7} md={12} sm={12} xs={12}>
                                    <div className="nominee-details-header"><b>
                                        <span>{this.state.selectedNomineeDetails.Runtime}</span>
                                        <span>{this.state.selectedNomineeDetails.Rated}</span>
                                        {this.state.selectedNomineeDetails.Ratings.map( rating => {
                                            return <span key={`${rating.Source}-${this.state.selectedNomineeDetails.imdbID}`}>
                                                {this.setRatingIcon(rating.Source)}{rating.Value}
                                                </span>
                                        })}
                                    </b></div>
                                    <p><b>Genre: </b>{this.state.selectedNomineeDetails.Genre}</p>
                                    <p>{this.state.selectedNomineeDetails.Plot}</p>
                                    <p><b>Director: </b>{this.state.selectedNomineeDetails.Director}</p>
                                    <p><b>Writers: </b>{this.state.selectedNomineeDetails.Writer}</p>
                                    <p><b>Actors: </b>{this.state.selectedNomineeDetails.Actors}</p>
                                    <p><b>Awards: </b>{this.state.selectedNomineeDetails.Awards}</p>
                                    <p><b>Production: </b>{this.state.selectedNomineeDetails.Production}</p>
                                    <p><b>Country: </b>{this.state.selectedNomineeDetails.Country}</p>
                                    <p><b>Languages: </b>{this.state.selectedNomineeDetails.Language}</p>
                                    <p><b>Box Office: </b>{this.state.selectedNomineeDetails.BoxOffice}</p>
                                    <p><b>Released: </b>{this.state.selectedNomineeDetails.Released}</p>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={() => this.onShowNomineeDetails(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        )
    }
}