import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import axios from "axios";

export default class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMovie: {},
            selectedMovieDetails: {},
            showMovieDetails: false,
            personalNominations: this.props.personalNominations,
            nominateMovie: this.props.nominateMovie,
            nominationLimit: this.props.nominationLimit
        };

        this.onShowMovieDetails = this.onShowMovieDetails.bind(this);
        this.handleSearchMovieDetails = this.handleSearchMovieDetails.bind(this);
        this.setMovieCardButton = this.setMovieCardButton.bind(this);
    }

    onShowMovieDetails(value) {
        this.setState({ showMovieDetails: value });

        if (value === false) {
            this.setState({ selectedMovie: {} });
            this.setState({ selectedMovieDetails: {} });
        }
    }

    async handleSearchMovieDetails(movie) {
        await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${movie.imdbID}&type=movie&plot=full&r=json`)
        .then(res => {
            const movieData = res.data;
            console.log('reponse', res);
            console.log('Movie Details', movieData);

            // if (movieData.Response === "False") {
            //     this.onNoResultsFound(true);
            // }
            // else {
                this.onShowMovieDetails(true);
                this.setState({ selectedMovie: movie });
                this.setState({ selectedMovieDetails: movieData });
            // }
        })
        .catch(err => {
            console.log(err);
        })
    };

    setMovieCardButton(movie) {
        var nominated = this.state.personalNominations.filter( nomination => nomination.imdbID === movie.imdbID );
        if (nominated.length !== 0) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="movie-details-container">
                {Object.keys(this.state.selectedMovieDetails).length === 0 ? '' :
                    <Modal size="lg" aria-labelledby="movie-details-title" centered show={this.state.showMovieDetails} onHide={() => this.onShowMovieDetails(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title id="movie-details-title">{this.state.selectedMovieDetails.Title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col lg={5} md={12} sm={12} xs={12}>
                                    <img src={this.state.selectedMovieDetails.Poster} />
                                    <p>Country: {this.state.selectedMovieDetails.Country}</p>
                                    <p>Languages: {this.state.selectedMovieDetails.Language}</p>
                                    <p>Production: {this.state.selectedMovieDetails.Production}</p>
                                    <p>Box Office: {this.state.selectedMovieDetails.BoxOffice}</p>
                                    <p>Released: {this.state.selectedMovieDetails.Released}</p>
                                    <p>Rated: {this.state.selectedMovieDetails.Rated}</p>
                                    <p>Duration: {this.state.selectedMovieDetails.Runtime}</p>
                                </Col>
                                <Col lg={7} md={12} sm={12} xs={12}>
                                    <p>{this.state.selectedMovieDetails.Plot}</p>
                                    <p>Genre: {this.state.selectedMovieDetails.Genre}</p>
                                    <p>Director: {this.state.selectedMovieDetails.Director}</p>
                                    <p>Writers: {this.state.selectedMovieDetails.Writer}</p>
                                    <p>Actors: {this.state.selectedMovieDetails.Actors}</p>
                                    <p>Awards: {this.state.selectedMovieDetails.Awards}</p>
                                    <ul style={{listStyle: "none", padding: "0"}}>Ratings: {this.state.selectedMovieDetails.Ratings.map( rating => {
                                        return <li key={`${rating.Source}-${this.state.selectedMovieDetails.imdbID}`} style={{paddingLeft: "40px"}}>{rating.Source} {rating.Value}</li>
                                    })}
                                    </ul>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={() => this.onShowMovieDetails(false)}>
                                Close
                            </Button>
                            {this.state.personalNominations.length === this.state.nominationLimit ?  
                                <Button type="button" variant="info" disabled>Limit Reached</Button>
                                : 
                                this.setMovieCardButton(this.state.selectedMovieDetails) === true ? 
                                    <Button type="button" variant="secondary" disabled>Nominated</Button> 
                                    :
                                    <Button type="button" variant="primary" onClick={() => this.state.nominateMovie(this.state.selectedMovie)}>Nominate Movie</Button>
                            }
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        )
    }
}
    