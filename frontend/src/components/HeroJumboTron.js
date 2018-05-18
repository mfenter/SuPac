import React, {Component} from 'react';
import {Col, Jumbotron, Row, Grid} from 'react-bootstrap';


class LandingHero extends Component {

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