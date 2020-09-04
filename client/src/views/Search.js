import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movieTitle: "",
            handleSearch: this.props.handleSearch
        };

        this.onPostChange = this.onPostChange.bind(this);
    }

    onPostChange(event) {
        this.setState({ movieTitle: event.target.value.trim() });
    }

    render() {
        return (
            <div className="search-container">
                <Card className="search-movies">
                    <Card.Body>
                        <Card.Title>Cast your Votes</Card.Title>
                        <Card.Text className="voting-instructions">
                            Select 5 of your favorite movies and help it take home The Shoppies Award. If you want to see more details for 
                            specific movies, just click on the movie image. If you've accidentally nominated the wrong movie, just navigate to the 
                            top of the page, hover on the movie image, and click the 'x' button to remove it from your movie nominations list. Once 
                            you've selected 5 of your favorite movies, hit the 'submit' button to cast your vote. Let your voice be heard!
                        </Card.Text>
                        <hr></hr>
                        <Form onSubmit={(event) => this.state.handleSearch(this.state.movieTitle, event)}>
                            <Form.Group controlId="formGroupSearchMovies">
                                <Form.Label className="h5">Movie Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter movie title" onChange={this.onPostChange} required/>
                            </Form.Group>
                            <Button type="submit" variant="primary">Search</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}