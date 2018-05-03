import React, {Component} from 'react';

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
        return (
            <div>
                {this._bodyListRender()}
                {this._plotListRender()}
            </div>
        )
    };
}

export default InventoryIndex