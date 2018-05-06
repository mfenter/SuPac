function createCartSocket(cartUsername) {

    let cartSocket = new WebSocket(
        'ws://' + window.location.host + '/ws/cart/' + cartUsername + '/'
    );

    cartSocket.onclose = function() {
        console.error("Cart Socket closed unexpectedly");
    };

    return cartSocket

}

export default createCartSocket