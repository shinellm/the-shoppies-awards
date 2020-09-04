import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';

import Search from "./Search";
import Movies from "./Movies";
import Nominations from "./Nominations";
import Notifications from "./Notifications";

export default class Vote extends Component {
    constructor() {
        super();
        this.state = {
            notifications: [],
            personalNominations: [],
            nominationLimit: 5
        };

        this.handleSearchMovie = this.handleSearchMovie.bind(this);
        this.onNominateMovie = this.onNominateMovie.bind(this);
        this.onRemoveNominatedMovie = this.onRemoveNominatedMovie.bind(this);
    }

    handleSearchMovie(searchValue, event) {
        event.preventDefault();

        this.movies.handleSearchMovie(searchValue);
    }

    onNominateMovie(movie) {
        let nominations = this.state.personalNominations;
        nominations.push(movie);
        this.setState({ personalNominations: nominations });

        let notifications = this.state.notifications;
        notifications.push({header: "Nominated Movie", movie: movie});
        this.setState({ notifications: notifications });

        this.notifications.onShowNotification(true);
        this.nominations.onNominateMovie(movie);
    }

    onRemoveNominatedMovie(movie) {
        let nominations = this.state.personalNominations;
        nominations.map( (nominated, index) => {
            if (nominated.imdbID === movie.imdbID) {
                nominations.splice(index, 1);
                return;
            }
        })
        this.setState({ personalNominations: nominations });

        let notifications = this.state.notifications;
        notifications.push({header: "Removed from Nominations", movie: movie});
        this.setState({ notifications: notifications });

        this.notifications.onShowNotification(true);
    }

    render() {
        return (
          <div id="vote-container">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Vote</Breadcrumb.Item>
            </Breadcrumb>
            <Nominations
              ref={(nominations) => (this.nominations = nominations)}
              personalNominations={this.state.personalNominations}
              nominationLimit={this.state.nominationLimit}
              removeNominatedMovie={this.onRemoveNominatedMovie}
            />
            <Search handleSearch={this.handleSearchMovie} />
            <Movies
              ref={(movies) => (this.movies = movies)}
              personalNominations={this.state.personalNominations}
              nominateMovie={this.onNominateMovie}
              nominationLimit={this.state.nominationLimit}
            />
            <Notifications
              ref={(notifications) => (this.notifications = notifications)}
              notifications={this.state.notifications}
            />
          </div>
        );
    }
}