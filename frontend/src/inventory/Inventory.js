import React, {Component} from 'react';
import {Grid, Row, Media} from 'react-bootstrap';

import './inventory.css'

import thumbnail from '../logo.svg';

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
        console.log(this.props);
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
        let href = `/inventory/celestial_body/${body}`;

        let imageName = `${body}.jpeg`;
        // let image = import(imageName).then(module => {
        //     console.log(module);
        // });

        return (
            <Media className="media-container">
                <Media.Left align="middle">
                    <img className="list-img" width={64} height={64} src={require(`../images/body/${imageName}`)} alt="thumbnail"/>
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

    _bodyListRender() {
        return (

            this.props.body_list.map(function (body) {
                    return <BodyList body={body}/>
                }
            )

        )
    }

    _plotListRender() {
        return (

            this.props.plot_list.map(function (plot) {
                    return <PlotList plot={plot}/>
                }
            )
        )
    }

    render() {
        console.log(this.props);
        return (
            <Grid>
                <Row>
                    {this._bodyListRender()}
                    {this._plotListRender()}
                </Row>
            </Grid>
        )
    };
}

export {InventoryIndex, PlotView}


//
// {/*<div>*/
// }
// {/*{this._bodyListRender()}*/
// }
// {/*{this._plotListRender()}*/
// }
// {/*</div>*/
// }