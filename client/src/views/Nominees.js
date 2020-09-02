import React, { Component } from 'react';
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap';
import axios from "axios";

export default class Nominees extends Component {
    constructor() {
        super();
        this.state = {
            searchTitle: "",
            movies: []
        };

        this.onPostChange = this.onPostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createCard = this.createCard.bind(this);
    }

    onPostChange(event) {
        this.setState({ searchTitle: event.target.value });
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
        // const response = await fetch("/api/", {
        // method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify({ post: this.state.post }),
        // });
        const response = await axios.get(`http://www.omdbapi.com/?apikey=180ab669&s=${this.state.searchTitle}&type=movie&page=1&r=json`);
        if (response.status !== 200) throw Error(response.message);
        const movieData = response.data;

        console.log('reponse', response);
        console.log('data', movieData);
        console.log('movies', movieData.Search);
        
        this.setState({ movies: movieData.Search });
    };

    createCard(movie) {
        return (
            <Card key={movie.imdbID} className="movie">
                <Card.Img variant="top" src={movie.Poster} width="200px" heigth="300px" />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>Released: {movie.Year}</Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
        )
    }

    render() {
        return (
            <div id="nominees-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Nominees</Breadcrumb.Item>
                </Breadcrumb>
                <p>Post to Backend Server</p>
                <form className="testForm" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="boilerplate_example">Movie Title:</label>
                        <input
                        type="post"
                        value={this.state.searchTitle}
                        onChange={this.onPostChange}
                        />
                        <button type="submit">Submit</button>
                    </div>
                </form>
                {this.state.movies.length === 0 ? '' :
                <CardColumns>
                    {this.state.movies.map((movie) => {
                        return this.createCard(movie);
                    })}
                </CardColumns>
                }
            </div>
        )
    }
}