import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import axios from "axios";

import { ReactComponent as Imdb } from "../../images/svg/imdbLogo.svg";
import { ReactComponent as Tomato } from "../../images/svg/rottenTomatoesLogo.svg";
import { ReactComponent as Metacritic } from "../../images/svg/metacriticLogo.svg";

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
        this.setRatingIcon = this.setRatingIcon.bind(this);
    }

    onShowMovieDetails(value) {
        this.setState({ showMovieDetails: value });

        if (value === false) {
            this.setState({ selectedMovie: {} });
            this.setState({ selectedMovieDetails: {} });
        }
    }

    async handleSearchMovieDetails(movie) {
        await axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${movie.imdbID}&type=movie&plot=full&r=json`)
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
            <div className="movie-details-container">
                {Object.keys(this.state.selectedMovieDetails).length === 0 ? '' :
                    <Modal size="lg" className="movie-details-modal" aria-labelledby="movie-details-title" centered show={this.state.showMovieDetails} onHide={() => this.onShowMovieDetails(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title id="movie-details-title">{this.state.selectedMovieDetails.Title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col className="column1" lg={5} md={12} sm={12} xs={12}>
                                    <img alt={this.state.selectedMovie.Title} src={this.state.selectedMovieDetails.Poster === 'N/A' ? '../../images/placeholder.png' : this.state.selectedMovieDetails.Poster} />
                                </Col>
                                <Col className="column2" lg={7} md={12} sm={12} xs={12}>
                                    <div className="movie-details-header"><b>
                                        <span>{this.state.selectedMovieDetails.Runtime}</span>
                                        <span>{this.state.selectedMovieDetails.Rated}</span>
                                        {this.state.selectedMovieDetails.Ratings.map( rating => {
                                            return <span key={`${rating.Source}-${this.state.selectedMovieDetails.imdbID}`}>
                                                {this.setRatingIcon(rating.Source)}{rating.Value}
                                                </span>
                                        })}
                                    </b></div>
                                    <p><b>Genre: </b>{this.state.selectedMovieDetails.Genre}</p>
                                    <p>{this.state.selectedMovieDetails.Plot}</p>
                                    <p><b>Director: </b>{this.state.selectedMovieDetails.Director}</p>
                                    <p><b>Writers: </b>{this.state.selectedMovieDetails.Writer}</p>
                                    <p><b>Actors: </b>{this.state.selectedMovieDetails.Actors}</p>
                                    <p><b>Awards: </b>{this.state.selectedMovieDetails.Awards}</p>
                                    <p><b>Production: </b>{this.state.selectedMovieDetails.Production}</p>
                                    <p><b>Country: </b>{this.state.selectedMovieDetails.Country}</p>
                                    <p><b>Languages: </b>{this.state.selectedMovieDetails.Language}</p>
                                    <p><b>Box Office: </b>{this.state.selectedMovieDetails.BoxOffice}</p>
                                    <p><b>Released: </b>{this.state.selectedMovieDetails.Released}</p>
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
    