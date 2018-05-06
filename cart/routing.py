from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'^ws/cart/(?P<cart_username>[^/]+)/$', consumers.CartConsumer),
]