import React, { Component } from 'react';
import { Breadcrumb, Card, Row, Col } from 'react-bootstrap';
import axios from "axios";

import NomineeDetails from "../components/nominees/NomineeDetails"

export default class Nominees extends Component {
    constructor() {
        super();
        this.state = {
            nominees: []
        };

        this.createNomineesCard = this.createNomineesCard.bind(this);
        this.handleSearchNomineeDetails = this.handleSearchNomineeDetails.bind(this);
    }

    async componentDidMount() {
        await axios.get('api/nominees')
        .then(res => {
            const nomineesData = res.data;
            this.setState({ nominees: nomineesData });
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleSearchNomineeDetails(nominee) {
        this.nomineeDetails.handleSearchNomineeDetails(nominee);
    }

    createNomineesCard(nominee) {
        return (
            <Col key={`nominee-${nominee.imdbID}`} lg={2} md={3} sm={6} xs={12}>
                <Card className="nominee-card">
                    <div className="cover">
                        <div className="header" onClick={() => this.handleSearchNomineeDetails(nominee)}>
                            <Card.Img className="nominee-image" src={nominee.Poster}/>
                            <Card.Title className="nominee-title">{nominee.Title}</Card.Title>
                        </div>
                        <div className="details">
                            <div className="nominee-stats">
                                <Card.Text>{nominee.Year}<span>Released</span></Card.Text>
                                <Card.Text>0<span>Nominations</span></Card.Text>
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
        )
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
                    <Card className="nominees-results">
                        <Card.Body>
                        <Card.Title>
                            Movies Nominated for The Shoppies Award
                        </Card.Title>
                        <hr />
                        <Row>
                            {this.state.nominees.map((nominee) => {
                            return this.createNomineesCard(nominee);
                            })}
                        </Row>
                        </Card.Body>
                    </Card>
                }
                <NomineeDetails ref={(nomineeDetails) => (this.nomineeDetails = nomineeDetails)}/>
            </div>
        )
    }
}