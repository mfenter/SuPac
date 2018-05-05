import React, {Component} from 'react';

import cartSocket from './websocket';

class PlotView extends Component {
    constructor(props) {
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

        this.cs = cartSocket(this.props.user);
    }

    _addLink(plotName) {
        let addHref = `/cart/add/${plotName}`;
        return (
            <p><a href={addHref} onClick={(e) => this._pivotLinks(e)}>Buy this interstellar Land</a></p>
        )
    }

    _removeLink(plotName) {
        let remHref = `/cart/remove/${plotName}`;
        return (
            <p><a href={remHref} onClick={(e) => this._pivotLinks(e)}>Remove {plotName} from cart</a></p>
        )
    }

    _pivotLinks = (e) => {
        e.preventDefault();

        //  Put item in cart and change link state

        let plotName = this.props.name;

        this.cs.send(JSON.stringify({
            'message': plotName
        }));

        if (this.state.inCart) {
            console.log("set to false");
            this.setState({
                "inCart": false
            })
        } else {
            console.log("set to true");
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

                {(!plot.owner
                    ? "No owner"
                    : <h3>{plot.owner}</h3>)}

                <div>
                    {(this.state.inCart
                        ? this._removeLink(plotName)
                        : this._addLink(plotName))}
                </div>


                <p>{plot.desc}</p>
            </div>
        )
    }
}

class PlotList extends Component {
    render() {
        let plot = this.props.plot;
        let href = `/inventory/celestial_body/plots/${plot}`;
        return (
            <a href={href}>{plot}</a>
        )
    }
}

class BodyList extends Component {
    render() {
        let body = this.props.body;
        let href = `/inventory/celestial_body/${body}`;
        return (
            <a href={href}>{body}</a>
        )
    }
}

class InventoryIndex extends Component {

    _bodyListRender() {
        return (
            this.props.body_list.map(function (body) {
                    return <div><BodyList body={body}/><br/></div>
                }
            )

        )
    }

    _plotListRender() {
        return (
            this.props.plot_list.map(function (plot) {
                    return <div><PlotList plot={plot}/><br/></div>
                }
            )
        )
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {this._bodyListRender()}
                {this._plotListRender()}
            </div>
        )
    };
}

export {InventoryIndex, PlotView}