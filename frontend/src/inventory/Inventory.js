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

    render() {
        console.log(this.props);
        let plot = this.props;
        let plotName = plot.name;
        let addHref = `/cart/add/${plotName}`;
        let remHref = `/cart/remove/${plotName}`;
        return(
             <div>
                 <h1><u>{plotName}</u></h1>

                 {( !plot.owner && !this.state.inCart
                     ? <p><a href={addHref} onClick={ () => this.setState({ "inCart": true }) }>Buy this interstellar Land</a></p>
                     : <h3>{plot.owner}</h3> )}

                 {( this.state.inCart
                     ? <p><a href={remHref} onClick={ () => this.setState({ "inCart": false }) }>Remove {plotName} from cart</a></p>
                     : () => {} )}

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

export { InventoryIndex, PlotView }