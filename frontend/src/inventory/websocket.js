function createCartSocket(cartUsername) {

    let cartSocket = new WebSocket(
        'ws://' + window.location.host + '/ws/cart/' + cartUsername + '/'
    );

    cartSocket.onmessage = function(ev) {
        let data = JSON.parse(ev.data);
        let message = data['message'];
        console.log(message)
    };

    cartSocket.onopen = function() {
        cartSocket.send(JSON.stringify({
            "message": "this is loaded"
        }));
    };

    cartSocket.onclose = function() {
        console.error("Cart Socket closed unexpectedly");
    };

    return cartSocket

}

export default createCartSocket