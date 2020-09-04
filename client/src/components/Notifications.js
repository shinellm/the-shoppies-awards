import React, { Component } from 'react';
import { Row, Col, Toast} from 'react-bootstrap';

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            notifications: this.props.notifications,
            showNotification: false,
        };

        this.onShowNotification = this.onShowNotification.bind(this);
        this.onRemoveNotification = this.onRemoveNotification.bind(this);
        this.createNotifications = this.createNotifications.bind(this);
    }

    onShowNotification(value) {
        console.log('notification: ', value)
        this.setState({ showNotification: value });
    }

    onRemoveNotification(notification) {
        let notifications = this.state.notifications;
        notifications.map( (notice, index) => {
            if (notice.movie.imdbID === notification.movie.imdbID) {
                notifications.splice(index, 1);
                return;
            }
        })

        console.log(this.state.notifications)
        this.onShowNotification(false);
        // this.setState({ notifications: notifications });
    }

    createNotifications(notification) {
        return (
            <Toast className="bottom-right" key={`notification-${notification.movie.imdbID}`} onClose={() => this.onRemoveNotification(notification)} show={this.showNotification} delay={3000} autohide>
                <Toast.Header>
                    {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
                    <strong className="mr-auto">{notification.header}</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body className="notification-text">{notification.movie.Title}</Toast.Body>
            </Toast>
        )
    }

    render() {
        return (
            <div className="nomination-notifications-container">
                {this.state.notifications.length === 0 ? '' :
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div className="notification-container">
                                <div className="notification">
                                    {this.state.notifications.map((notification) => {
                                        return this.createNotifications(notification);
                                    })}
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}