import React, {Component} from 'react';

class CartItem extends Component {
    render() {
        let item = this.props.item;
        return (
            <div>
                <h1>{item.name}</h1>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: {item.subtotal}</p>
            </div>
        )
    }
}


class Cart extends Component {

    _showLinks() {
        if (this.props.items.length > 0) {
            return (
                <div>
                    <p><a href="/cart/clear">Remove Everything</a></p>
                    <p><a href="/merchant/">Prepare for blast off!</a></p>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.props.items.map(function (item) {
                    return <CartItem item={item}/>
                })}

                <p>Total: {this.props.total}</p>

                {this._showLinks()}

                <p><a href="/inventory/">Go back to inventory</a></p>
            </div>
        )
    }
}

export default Cart