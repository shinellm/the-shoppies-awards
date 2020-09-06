import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";

import MovieDetails from "./MovieDetails"

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedTitle: "",
            movies: [],
            noResultsFound: false,
            personalNominations: this.props.personalNominations,
            nominateMovie: this.props.nominateMovie,
            nominationLimit: this.props.nominationLimit
        };

        this.onSetMovies = this.onSetMovies.bind(this);
        this.onNoResultsFound = this.onNoResultsFound.bind(this);

        this.handleSearchMovie = this.handleSearchMovie.bind(this);
        this.handleSearchMovieDetails = this.handleSearchMovieDetails.bind(this);

        this.createMovieCard = this.createMovieCard.bind(this);
        this.setMovieCardButton = this.setMovieCardButton.bind(this);
    }

    onSetMovies(value) {
        this.setState({ movies: value });
    }

    onNoResultsFound(value) {
        this.setState({ noResultsFound: value });
    }

    async handleSearchMovie(searchValue) {
        await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}&type=movie&page=1&r=json`)
        .then(res => {
            const movieData = res.data;
            console.log('reponse', res);
            console.log('data', movieData);

            this.setState({ searchedTitle: searchValue });

            if (movieData.Response === "False") {
                this.onNoResultsFound(true);
                this.onSetMovies([]);
            }
            else {
                console.log('movies', movieData.Search);
                this.onNoResultsFound(false);
                this.onSetMovies(movieData.Search);
            }
        })
        .catch(err => {
          console.log(err);
        })
    };

    handleSearchMovieDetails(movie) {
        this.movieDetails.handleSearchMovieDetails(movie);
    }

    createMovieCard(movie) {
        return (
            <Col key={`movie-${movie.imdbID}`} lg={2} md={3} sm={6} xs={12}>
                <Card className="movie-card">
                    <div className="cover">
                        <div className="header" onClick={() => this.handleSearchMovieDetails(movie)}>
                            <Card.Img className="movie-image" src={movie.Poster === 'N/A' ? '../../images/placeholder.png' : movie.Poster}/>
                            <Card.Title className="movie-title">{movie.Title}</Card.Title>
                        </div>
                        <div className="details">
                            <div className="movie-stats">
                                <Card.Text>Released<span>{movie.Year}</span></Card.Text>
                            </div>
                            {this.state.personalNominations.length === this.state.nominationLimit ?  
                                <Button type="button" variant="info" disabled>Limit Reached</Button>
                                : 
                                this.setMovieCardButton(movie) === true ? 
                                    <Button type="button" variant="secondary" disabled>Nominated</Button> 
                                    :
                                    <Button type="button" variant="primary" onClick={() => this.state.nominateMovie(movie)}>Nominate Movie</Button>
                            }
                        </div>
                    </div>
                </Card>
            </Col>
        )
    }

    setMovieCardButton(movie) {
        var nominated = this.state.personalNominations.filter( nomination => nomination.imdbID === movie.imdbID );
        if (nominated.length !== 0) {
            return true;
        }
        return false;
    }

    render() {
        return (
          <div className="movie-results-container">
            {this.state.noResultsFound === false ? (
              ""
            ) : (
              <Card className="search-results-empty">
                <Card.Body>
                  <Card.Title>
                    Results for "{this.state.searchedTitle}"
                  </Card.Title>
                  <hr></hr>
                  <Card.Text>
                    Movie not found! The movie title you've searched for may
                    have be mispelled or it may not exist in the OMDB database.
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
            {this.state.movies.length === 0 ||
            this.state.noResultsFound === true ? (
              ""
            ) : (
              <Card className="search-results">
                <Card.Body>
                  <Card.Title>
                    Results for "{this.state.searchedTitle}"
                  </Card.Title>
                  <hr></hr>
                  <Row>
                    {this.state.movies.map((movie) => {
                      return this.createMovieCard(movie);
                    })}
                  </Row>
                </Card.Body>
              </Card>
            )}
            <MovieDetails
              ref={(movieDetails) => (this.movieDetails = movieDetails)}
              personalNominations={this.state.personalNominations}
              nominateMovie={this.state.nominateMovie}
              nominationLimit={this.state.nominationLimit}
            />
          </div>
        );
    }
}