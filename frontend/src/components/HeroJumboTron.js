import React, {Component} from 'react';
import {Col, Jumbotron, Row, Grid} from 'react-bootstrap';
import { createContentSocket } from '../app/websocket';

class LandingHero extends Component {

    componentDidMount(){
        this.socket = createContentSocket(this.props.user, window.location.pathname)

    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={14}>
                        <Jumbotron>
                            Hugely bad
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        )
    };
}

export default LandingHero;