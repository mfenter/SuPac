import React, {Component} from 'react';


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