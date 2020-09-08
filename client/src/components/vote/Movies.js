import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";

import MovieDetails from "./MovieDetails"

export default class Movies extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchedTitle: "",
        page: 1,
        movies: [],
        moviesByID: {},
        totalResults: 0,
        noResultsFound: false,
        personalNominations: this.props.personalNominations,
        nominateMovie: this.props.nominateMovie,
        nominationLimit: this.props.nominationLimit
      };

      this.onSetPage = this.onSetPage.bind(this);
      this.onSetMovies = this.onSetMovies.bind(this);
      this.onRecordMovieID = this.onRecordMovieID.bind(this);
      this.onAppendLoadedMovies = this.onAppendLoadedMovies.bind(this);
      this.onSetTotalResults = this.onSetTotalResults.bind(this);
      this.onNoResultsFound = this.onNoResultsFound.bind(this);

      this.handleSearchMovie = this.handleSearchMovie.bind(this);
      this.handleSearchMovieDetails = this.handleSearchMovieDetails.bind(this);

      this.loadMoreMovies = this.loadMoreMovies.bind(this);
      this.createMovieCard = this.createMovieCard.bind(this);
      this.setMovieCardButton = this.setMovieCardButton.bind(this);
    }

    onSetPage(value) {
      this.setState({ page: value });
    }

    onSetMovies(array) {
      this.onRecordMovieID(array);

      this.setState({ movies: array });
    }

    onRecordMovieID(array) {
      let objMap = this.state.moviesByID;

      array.map( movie => {
        if (objMap[movie.imdbID]) {
          objMap[movie.imdbID] = objMap[movie.imdbID] + 1;
        }
        else {
          objMap[movie.imdbID] = 1;
        }
      })
      this.setState({ moviesByID: objMap });
    }

    onAppendLoadedMovies(array) {
      const listOfMovies = this.state.movies;

      this.onRecordMovieID(array);

      const newlist = listOfMovies.concat(array);
      this.setState({ movies: newlist }); 
      console.log(newlist );
    }

    onSetTotalResults(value) {
      this.setState({ totalResults: value });
    }

    onNoResultsFound(value) {
        this.setState({ noResultsFound: value });
    }

    async handleSearchMovie(searchValue, page) {
      await axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}&type=movie&page=${page}&r=json`)
      .then(res => {
        const movieData = res.data;
        console.log('reponse', res);
        console.log('data', movieData);

        this.setState({ searchedTitle: searchValue });

        if (movieData.Response === "False") {
          this.onNoResultsFound(true);
          this.onSetPage(1);
          this.onSetMovies([]);
          this.onSetTotalResults(0);
        }
        else if (this.state.movies.length !== 0 && page !== 1) {
          console.log('page',page,'movies', movieData.Search);
          this.onNoResultsFound(false);
          this.onSetPage(page + 1);
          this.onAppendLoadedMovies(movieData.Search);
        }
        else {
          console.log('initial page',page,'movies', movieData.Search);
          this.onNoResultsFound(false);
          this.onSetPage(page + 1);
          this.onSetMovies(movieData.Search);
          this.onSetTotalResults(parseInt(movieData.totalResults), 10);
        }
        console.log(this.state.totalResults,this.state.movies.length)
      })
      .catch(err => {
        console.log(err);
      })
    };

    handleSearchMovieDetails(movie) {
      this.movieDetails.handleSearchMovieDetails(movie);
    }

    loadMoreMovies() {
      this.handleSearchMovie(this.state.searchedTitle, this.state.page);
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
                    {this.state.totalResults} Results for "{this.state.searchedTitle}"
                  </Card.Title>
                  <hr></hr>
                  <Row>
                    {this.state.movies.map((movie) => {
                      return this.createMovieCard(movie);
                    })}
                  </Row>
                  {this.state.totalResults === this.state.movies.length ? '' :
                    <Row className="load-more-btn">
                      <Button className="load-more" variant="primary" onClick={this.loadMoreMovies}>Load More Movies</Button>
                    </Row>
                  }
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