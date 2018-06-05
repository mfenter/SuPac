from carton.cart import Cart
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from cart.cart_util import add_to_cart, remove_from_cart


class CartAddView(LoginRequiredMixin, APIView):

    login_url = '/login/'

    def get(self, request, plot, *args, **kwargs):
        cart = Cart(request.session)
        add_to_cart(cart, plot)
        return Response({'message': 'Added to Cart'}, status=status.HTTP_202_ACCEPTED)


class CartRemoveView(LoginRequiredMixin, APIView):

    login_url = '/login/'

    def get(self, request, plot, *args, **kwargs):
        cart = Cart(request.session)
        remove_from_cart(cart, plot)
        return Response({'message': 'Removed from Cart'}, status=status.HTTP_202_ACCEPTED)


class CartClearView(LoginRequiredMixin, APIView):

    login_url = '/login/'

    def get(self, request, *args, **kwargs):
        cart = Cart(request.session)
        cart.clear()
        return Response({'message': 'Cart Cleared'}, status=status.HTTP_202_ACCEPTED)
