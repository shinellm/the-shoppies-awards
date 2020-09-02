import React, { Component } from 'react';
import { Breadcrumb, Card, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaTimes } from "react-icons/fa";
import axios from "axios";

export default class Vote extends Component {
    constructor() {
        super();
        this.state = {
            movieTitle: "",
            searchedTitle: "",
            movies: [],
            noResultsFound: false,
            showMovieDetails: false,
            selectedMovie: {},
            selectedMovieDetails: {},
            personalNominations: []
        };

        this.onPostChange = this.onPostChange.bind(this);
        this.onNoResultsFound = this.onNoResultsFound.bind(this);
        this.onNominateMovie = this.onNominateMovie.bind(this);
        this.onShowMovieDetails = this.onShowMovieDetails.bind(this);
        this.onRemoveNominatedMovie = this.onRemoveNominatedMovie.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchMovieDetails = this.handleSearchMovieDetails.bind(this);
        this.createNominationCard = this.createNominationCard.bind(this);
        this.createMovieCard = this.createMovieCard.bind(this);
        this.setMovieCardButton = this.setMovieCardButton.bind(this);

    }

    onPostChange(event) {
        this.setState({ movieTitle: event.target.value.trim() });
    }

    onNoResultsFound(value) {
        this.setState({ noResultsFound: value });
    }

    onNominateMovie(movie) {
        let nominations = this.state.personalNominations;
        nominations.push(movie);
        this.setState({ personalNominations: nominations });
    }

    onShowMovieDetails(value) {
        this.setState({ showMovieDetails: value});
    }

    onRemoveNominatedMovie(nomination) {
        let nominations = this.state.personalNominations;
        console.log('nominated: ', nominations)
        nominations.map( (nominated, index) => {
            if (nominated.imdbID === nomination.imdbID) {
                nominations.splice(index, 1);
                return;
            }
            console.log(nominated)
        })
        console.log('remove: ',nomination,'nomination removed: ', nominations)
        this.setState({ personalNominations: nominations });
    }

    // /*
    //     This is a mock GET request it will return the info in the POST request and the express route.
    //     It is a demonstration of an AJAX using the axios library
    //     */
    // async componentDidMount() {
    //     const response = await axios.get(`http://www.omdbapi.com/?apikey=180ab669&s=${this.state.searchTitle}&type=movie&page=1&r=json`);
    //     if (response.status !== 200) throw Error(response.message);
    //     const movieData = response.data;

    //     console.log('reponse', response);
    //     console.log('data', movieData);
    //     console.log('movies', movieData.Search);
        
    //     this.setState({ movies: movieData.Search });

    //     // return body;
    // }

    /* 
        This is a mock POST request.
        It is a demonstration of an AJAX call using the fetch API
        */
    // handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch("/api/", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ post: this.state.post }),
    //     });
    //     console.log(response);
    //     // const body = await response.text();
    //     // this.setState({ responseToPost: body });
    // };

    async handleSubmit(event) {
        event.preventDefault();

        await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${this.state.movieTitle}&type=movie&page=1&r=json`)
        .then(res => {
            const movieData = res.data;
            console.log('reponse', res);
            console.log('data', movieData);

            this.setState({ searchedTitle: this.state.movieTitle });

            if (movieData.Response === "False") {
                this.onNoResultsFound(true);
            }
            else {
                console.log('movies', movieData.Search);
                this.onNoResultsFound(false);
                this.setState({ movies: movieData.Search });
            }
        })
        .catch(err => {
            throw Error(err.message)
        })
    };

    async handleSearchMovieDetails(id) {
        await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}&type=movie&plot=full&r=json`)
        .then(res => {
            const movieData = res.data;
            console.log('reponse', res);
            console.log('Movie Details', movieData);

            if (movieData.Response === "False") {
                this.onNoResultsFound(true);
            }
            else {
                this.onShowMovieDetails(true);
                this.setState({ selectedMovieDetails: movieData });
            }
        })
        .catch(err => {
            throw Error(err.message)
        })
    };

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

    createMovieCard(movie) {
        return (
            <Col key={`movie-${movie.imdbID}`} lg={2} md={3} sm={6} xs={12}>
                <Card className="movie-card">
                    <div className="cover">
                        <div className="header" onClick={() => this.handleSearchMovieDetails(movie.imdbID)}>
                            <Card.Img className="movie-image" src={movie.Poster}/>
                            <Card.Title className="movie-title">{movie.Title}</Card.Title>
                        </div>
                        <div className="details">
                            <div className="movie-stats">
                                <Card.Text>{movie.Year}<span>Released</span></Card.Text>
                                <Card.Text>0<span>Nominations</span></Card.Text>
                            </div>
                            {this.setMovieCardButton(movie) === true ? 
                                <Button type="button" variant="secondary" disabled>Nominated</Button> 
                                :
                                <Button type="button" variant="primary" onClick={() => this.onNominateMovie(movie)}>Nominate Movie</Button>
                            }
                        </div>
                    </div>
                </Card>
            </Col>
        )
    }

    setMovieCardButton(movie) {
        console.log('setting movie card button');
        var nominated = this.state.personalNominations.filter( nomination => nomination.imdbID === movie.imdbID );
        if (nominated.length !== 0) {
            console.log('nominated: ', movie)
            return true;
        }
        else {
            console.log('not nominated: ', movie)
            return false;
        }
    }

    render() {
        return (
            <div id="vote-container">
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
                                        return <li style={{paddingLeft: "40px"}}>{rating.Source} {rating.Value}</li>
                                    })}
                                    </ul>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={() => this.onShowMovieDetails(false)}>
                                Close
                            </Button>
                            {this.setMovieCardButton(this.state.selectedMovieDetails) === true ? 
                                <Button type="button" variant="secondary" disabled>Nominated</Button> 
                                :
                                <Button type="button" variant="primary" onClick={() => this.onNominateMovie(this.state.selectedMovie)}>Nominate Movie</Button>
                            }
                        </Modal.Footer>
                    </Modal>
                }
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Vote</Breadcrumb.Item>
                </Breadcrumb>
                {this.state.personalNominations.length === 0 ? '' :
                    <Card className="personal-movie-nominations">
                        <Card.Body>
                            <Card.Title>Your Movie Nominations ({this.state.personalNominations.length})</Card.Title>
                            <Row>
                                {this.state.personalNominations.map((nomination) => {
                                    return this.createNominationCard(nomination);
                                })}
                            </Row>
                        </Card.Body>
                    </Card>
                }
                <Card className="search-movies">
                    <Card.Body>
                        <Card.Title>Cast your Votes</Card.Title>
                        <Card.Text>Vote for your favorite movie and help it take home The Shoppies award.</Card.Text>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formGroupSearchMovies">
                                <Form.Label>Movie Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter movie title" onChange={this.onPostChange} required/>
                            </Form.Group>
                            <Button type="submit" variant="primary">Search</Button>
                        </Form>
                    </Card.Body>
                </Card>
                {this.state.noResultsFound === false ? '' :
                    <Card className="search-results-empty">
                        <Card.Body>
                            <Card.Title>Results for "{this.state.searchedTitle}"</Card.Title>
                            <hr></hr>
                            <Card.Text>Movie not found! The movie title you've searched for may have be mispelled or it may not exist in the OMDB database.</Card.Text>
                        </Card.Body>
                    </Card>
                }
                {this.state.movies.length === 0 || this.state.noResultsFound === true ? '' :
                    <Card className="search-results">
                        <Card.Body>
                            <Card.Title>Results for "{this.state.searchedTitle}"</Card.Title>
                            <hr></hr>
                            <Row>
                                {this.state.movies.map((movie) => {
                                    return this.createMovieCard(movie);
                                })}
                            </Row>
                        </Card.Body>
                    </Card>
                }
            </div>
        )
    }
}