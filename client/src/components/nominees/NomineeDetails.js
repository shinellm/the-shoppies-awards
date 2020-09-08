import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import axios from "axios";

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

    render() {
        return (
            <div className="nominee-details-container">
                {Object.keys(this.state.selectedNomineeDetails).length === 0 ? '' :
                    <Modal size="lg" aria-labelledby="nominee-details-title" centered show={this.state.showNomineeDetails} onHide={() => this.onShowNomineeDetails(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title id="nominee-details-title">{this.state.selectedNomineeDetails.Title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col lg={5} md={12} sm={12} xs={12}>
                                    <img alt={this.state.selectedNominee.Title} src={this.state.selectedNomineeDetails.Poster === 'N/A' ? '../../images/placeholder.png' : this.state.selectedNomineeDetails.Poster} />
                                    <p>Country: {this.state.selectedNomineeDetails.Country}</p>
                                    <p>Languages: {this.state.selectedNomineeDetails.Language}</p>
                                    <p>Production: {this.state.selectedNomineeDetails.Production}</p>
                                    <p>Box Office: {this.state.selectedNomineeDetails.BoxOffice}</p>
                                    <p>Released: {this.state.selectedNomineeDetails.Released}</p>
                                    <p>Rated: {this.state.selectedNomineeDetails.Rated}</p>
                                    <p>Duration: {this.state.selectedNomineeDetails.Runtime}</p>
                                </Col>
                                <Col lg={7} md={12} sm={12} xs={12}>
                                    <p>{this.state.selectedNomineeDetails.Plot}</p>
                                    <p>Genre: {this.state.selectedNomineeDetails.Genre}</p>
                                    <p>Director: {this.state.selectedNomineeDetails.Director}</p>
                                    <p>Writers: {this.state.selectedNomineeDetails.Writer}</p>
                                    <p>Actors: {this.state.selectedNomineeDetails.Actors}</p>
                                    <p>Awards: {this.state.selectedNomineeDetails.Awards}</p>
                                    <ul style={{listStyle: "none", padding: "0"}}>Ratings: {this.state.selectedNomineeDetails.Ratings.map( rating => {
                                        return <li key={`${rating.Source}-${this.state.selectedNomineeDetails.imdbID}`} style={{paddingLeft: "40px"}}>{rating.Source} {rating.Value}</li>
                                    })}
                                    </ul>
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