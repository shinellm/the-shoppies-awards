import React, { Component } from 'react';
import { Breadcrumb, Card, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from "axios";

export default class Vote extends Component {
    constructor() {
        super();
        this.state = {
            searchTitle: "",
            movies: [],
            showMovieDetails: false,
            selectedMovie: {},
            selectedMovieDetails: {},
            personalNominations: []
        };

        this.onPostChange = this.onPostChange.bind(this);
        this.onNominateMovie = this.onNominateMovie.bind(this);
        this.onShowMovieDetails = this.onShowMovieDetails.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchMovieDetails = this.handleSearchMovieDetails.bind(this);
        this.createNominationCard = this.createNominationCard.bind(this);
        this.createMovieCard = this.createMovieCard.bind(this);
        this.setMovieCardButton = this.setMovieCardButton.bind(this);

    }

    onPostChange(event) {
        this.setState({ searchTitle: event.target.value });
    }

    onNominateMovie(movie) {
        let nominations = this.state.personalNominations;
        nominations.push(movie);
        this.setState({ personalNominations: nominations });
    }

    onShowMovieDetails(value) {
        this.setState({ showMovieDetails: value});
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

        const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${this.state.searchTitle}&type=movie&page=1&r=json`);
        if (response.status !== 200) throw Error(response.message);
        const movieData = response.data;

        console.log('reponse', response);
        console.log('data', movieData);
        console.log('movies', movieData.Search);
        
        this.setState({ movies: movieData.Search });
    };

    async handleSearchMovieDetails(id) {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}&type=movie&plot=full&r=json`);
        if (response.status !== 200) throw Error(response.message);
        const movieData = response.data;

        console.log('reponse', response);
        console.log('Movie Details', movieData);
        
        this.setState({ selectedMovieDetails: movieData });
        this.onShowMovieDetails(true);
    };

    createNominationCard(nomination) {
        return (
            <Col key={`nominations-${nomination.imdbID}`} lg={2} md={3} sm={6} xs={12}>
                <Card className="nomination-card">
                    <div className="cover">
                        <Card.Img className="nomination-image" src={nomination.Poster}/>
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
                            {this.setMovieCardButton(movie)}
                        </div>
                    </div>
                </Card>
            </Col>
        )
    }

    setMovieCardButton(movie) {
        return (
            this.state.personalNominations.length !== 0 ?
            this.state.personalNominations.map( nomination => {
                return (
                    nomination.Title === movie.Title ? 
                        <Button type="button" variant="secondary" disabled>Nominated</Button>
                        :
                        <Button type="button" variant="primary" onClick={() => this.onNominateMovie(movie)}>Nominate Movie</Button>
                )
            })
            :
            <Button type="button" variant="primary" onClick={() => this.onNominateMovie(movie)}>Nominate Movie</Button>
        )
    }

    render() {
        return (
            <div id="vote-container">
                {Object.keys(this.state.selectedMovieDetails).length === 0 ? '' :
                    <Modal size="lg" aria-labelledby="movie-details-title" centered show={this.state.showMovieDetails} onHide={() => this.onShowMovieDetails(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title id="movie-details-title">{this.state.selectedMovieDetails.Title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal! We'll be adding movie details soon!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.onShowMovieDetails(false)}>
                                Close
                            </Button>
                            {this.setMovieCardButton(this.state.selectedMovieDetails)}
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
                {this.state.movies.length === 0 ? '' :
                    <Card className="search-results">
                        <Card.Body>
                            <Card.Title>Results for "{this.state.searchTitle}"</Card.Title>
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