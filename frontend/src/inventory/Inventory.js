import React, {Component} from 'react';
import {Grid, Media, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import './inventory.css'

import thumbnail from '../logo.svg';
import {withRouter} from "react-router-dom";

import * as axios from "axios";


class PlotView extends Component {
    constructor() {
        super();

        this.state = {
            "inCart": false
        }
    }

    componentWillMount() {
        if (this.props.in_cart) {
            this.setState({
                "inCart": true
            })
        }

    }

    _addLink(plotName) {
        let addHref = `/cart/add/${plotName}`;
        return (
            <p><a href={addHref} onClick={(e) => this._pivotLinks(e, "add", plotName)}>Buy this interstellar Land</a>
            </p>
        )
    }

    _removeLink(plotName) {
        let remHref = `/cart/remove/${plotName}`;
        return (
            <p><a href={remHref} onClick={(e) => this._pivotLinks(e, "remove", plotName)}>Remove {plotName} from
                cart</a></p>
        )
    }

    _pivotLinks = (e, action, plotName) => {
        e.preventDefault();

        //  Put item in cart and update app state
        // let plotName = this.props.name;

        // TODO: Needs to call parent function setting state; which gets passed to header

        this.props.updateCart(action, plotName);

        // Set state of plot in cart
        if (this.state.inCart) {
            this.setState({
                "inCart": false
            })
        } else {
            this.setState({
                "inCart": true
            })
        }

    };

    render() {
        let plot = this.props;
        let plotName = plot.name;


        return (
            <div>
                <h1><u>{plotName}</u></h1>

                {(plot.owner === "null"
                    ? <div>
                        {(this.state.inCart
                            ? this._removeLink(plotName)
                            : this._addLink(plotName))}
                    </div>
                    : <h3>{plot.owner}</h3>)}


                <p>{plot.desc}</p>
            </div>
        )
    }
}

class PlotList extends Component {
    render() {
        let plot = this.props.plot;
        let href = `/inventory/celestial_body/plots/${plot.name}`;
        return (
            <Media className="media-container">
                <Media.Left>
                    <img width={64} height={64} src={thumbnail} alt="thumbnail"/>
                </Media.Left>
                <Media.Body>
                    <Media.Heading><a href={href}>Plot: {plot.name}</a></Media.Heading>
                    <p>
                        {plot.desc}
                    </p>
                </Media.Body>
            </Media>
        )
    }
}

class BodyList extends Component {
    render() {
        let body = this.props.body;
        let href = `/inventory/celestial_body/${body.name}`;

        // let image = import(imageName).then(module => {
        //     console.log(module);
        // });

        return (
            <Media className="media-container">
                <Media.Left align="middle">
                    <img className="list-img" width={64} height={64} src='http://localhost:8000/'
                         alt="thumbnail"/>
                </Media.Left>
                <Media.Body>
                    <Media.Heading><a href={href}>{body}</a></Media.Heading>
                    <p>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                        fringilla. Donec lacinia congue felis in faucibus.
                    </p>
                </Media.Body>
            </Media>
        )
    }
}

class InventoryIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bodyData: []
        };
    }

    componentWillMount() {
        axios.all([axios.get(`http://localhost:8000/api/get-body-data/${this.props.body}/`)])
            .then(response => {
                return response[0].data
            })
            .then(json => {
                console.log(json);

            })

    }

    _bodyListRender() {

        console.log(this.state);
        console.log("state ^^^^")
        console.log(this.props);
        if (this.state !== null) {
            return (<BodyList body={this.state.bodyData}/>)
        }
    }

    _plotListRender() {
        return (

            this.props.plotItems.map(function (plot) {
                    return <PlotList plot={plot}/>
                }
            )
        )
    }

    render() {
        return (
            <Grid>
                <Row>
                    {this._bodyListRender()}
                </Row>
            </Grid>
        )
    };
}

function mapStateToProps(state) {
    return state
}

InventoryIndex = connect(mapStateToProps)(InventoryIndex);
InventoryIndex = withRouter(InventoryIndex);

export {InventoryIndex, PlotView}
