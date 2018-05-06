from channels.sessions import SessionMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

import cart.routing


application = ProtocolTypeRouter({
    'websocket': SessionMiddlewareStack(
        URLRouter(
            cart.routing.websocket_urlpatterns
        )
    ),
})
