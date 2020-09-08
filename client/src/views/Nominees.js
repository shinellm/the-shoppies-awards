import React, { Component } from 'react';
import { Breadcrumb, Card, Row, Col } from 'react-bootstrap';
import axios from "axios";

import NomineeDetails from "../components/nominees/NomineeDetails";
import { ReactComponent as Crown }  from '../images/svg/crown.svg';

export default class Nominees extends Component {
    constructor() {
        super();
        this.state = {
            nominees: [],
            topThreeNominees: []
        };

        this.createNomineesCard = this.createNomineesCard.bind(this);
        this.createTopThreeNomineesCard = this.createTopThreeNomineesCard.bind(this);
        this.setRankSuffix = this.setRankSuffix.bind(this);
        this.handleSearchNomineeDetails = this.handleSearchNomineeDetails.bind(this);
    }

    async componentDidMount() {
        await axios.get('api/nominees')
        .then(res => {
            const nomineesData = res.data;
            this.setState({ nominees: nomineesData });
            this.setState({ topThreeNominees: nomineesData.slice(0 , 3)});
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleSearchNomineeDetails(nominee) {
        this.nomineeDetails.handleSearchNomineeDetails(nominee);
    }

    createNomineesCard(nominee, index) {
        return (
            <Col key={`nominee-${nominee.movie_imdbID}`} lg={2} md={3} sm={6} xs={12}>
                <Card className="nominee-card">
                    <div className="cover">
                        {index >= 20 ? '' :
                            <div className="rank">{index + 1}</div>
                        }
                        <div className="header" onClick={() => this.handleSearchNomineeDetails(nominee)}>
                            <Card.Img className="nominee-image" src={nominee.movie_poster === 'N/A' ? '../../images/placeholder.png' : nominee.movie_poster}/>
                            <Card.Title className="nominee-title">{nominee.movie_title}</Card.Title>
                        </div>
                        <div className="details">
                            <div className="nominee-stats">
                                <Card.Text>{nominee.movie_year}<span>Released</span></Card.Text>
                                <Card.Text>{nominee.movie_votes}<span>Nominations</span></Card.Text>
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
        )
    }

    createTopThreeNomineesCard(nominee, index) {
        return (
            <Col className="top-nominee" key={`top-nominees-${nominee.movie_imdbID}`} lg={3} md={4} sm={8} xs={8}>
                <div className="ranking">
                    <div className="number">
                        {this.setRankSuffix(index)}
                    </div>
                    <Crown />
                </div>
                <div className="cover" onClick={() => this.handleSearchNomineeDetails(nominee)}>
                    <Card.Img className="top-three-image" src={nominee.movie_poster}></Card.Img>
                    <Card.Title>{nominee.movie_title}</Card.Title>
                </div>
            </Col>
        )
    }

    setRankSuffix(index) {
        let suffix = '';
        let rank = index + 1;
        switch (rank) {
            case 2:
                suffix = 'nd';
                break;
            case 3:
                suffix = 'rd';
                break;
            default:
                suffix = 'st';
        }
        return rank + suffix;
    }

    render() {
        return (
            <div id="nominees-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Nominees</Breadcrumb.Item>
                </Breadcrumb>
                {this.state.nominees.length === 0 ? 
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Movies Nominated for The Shoppies Award
                            </Card.Title>
                            <hr />
                            <Card.Text>
                                We are currently counting everyone's votes and compiling the list of 
                                nominated movies. Please check back later to see which movies are in 
                                the running for winning The Shoppies Award.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    :
                    <div>
                        <Card className="top-three-nominees">
                            <Card.Body>
                                <Card.Title>
                                    Top 3 Movies Nominated for The Shoppies Award
                                </Card.Title>
                                <hr />
                                <Row className="top-three-row">
                                    {this.state.topThreeNominees.map( (nominee, index) => {
                                        return this.createTopThreeNomineesCard(nominee, index);
                                    })}
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card className="nominees-results">
                            <Card.Body>
                            <Card.Title>
                                All Movies Nominated for The Shoppies Award
                            </Card.Title>
                            <Card.Text>
                                Votes are coming in around the clock as everyone submits their favorite movies. 
                                Check out our running list of nominated movies and see how many nominations your 
                                favorite movie has gotten so far. The list is ordered from greatest number of nominations 
                                to least number of nominations. If you want to see the exact number of nominations a 
                                particular movie has received, just hover over it. If you've stumbled upon a movie and 
                                want to see more details about it, just click on the movie's image or title. 
                            </Card.Text>
                            <hr />
                            <Row>
                                {this.state.nominees.map((nominee, index) => {
                                return this.createNomineesCard(nominee, index);
                                })}
                            </Row>
                            </Card.Body>
                        </Card>
                    </div>
                }
                <NomineeDetails ref={(nomineeDetails) => (this.nomineeDetails = nomineeDetails)}/>
            </div>
        )
    }
}