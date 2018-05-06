import json

from channels.generic.websocket import WebsocketConsumer

from carton.cart import Cart

from .cart_util import add_to_cart, remove_from_cart


class CartConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()

    def disconnect(self, closing_code):
        pass

    # RECEIVED FROM THE SOCKET CLIENT
    def receive(self, text_data=None, bytes_data=None):
        text_json = json.loads(text_data)
        action = text_json['action']

        cart = Cart(self.scope["session"])

        if action == "add":
            plot = text_json['plot']
            cart = add_to_cart(cart, plot)
            self.scope["session"].save()
            print(f"After adding, length of cart is {len(cart.products)}")
        if action == "remove":
            plot = text_json['plot']
            cart = remove_from_cart(cart, plot)
            self.scope["session"].save()
            print(f"After adding, length of cart is {len(cart.products)}")
        if action == "get":
            pass

        cart_qty = len(cart.products)

        self.send(text_data=json.dumps({
            'qty': cart_qty
        }))



        # text_json = json.loads(text_data)
        # message = text_json['message']
        #
        # self.send(text_data=json.dumps({
        #     'message': message
        # }))


