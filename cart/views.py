import json

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import View

from carton.cart import Cart

from .cart_util import add_to_cart, remove_from_cart


class AddToCartView(View):

    def get(self, request, name):
        if request.user.is_authenticated:
            cart = Cart(request.session)
            cart = add_to_cart(cart, name)
            return redirect('/cart')
        else:
            return HttpResponse('must be logged in')


class RemoveFromCartView(View):

    def get(self, request, name):
        if request.user.is_authenticated:
            cart = Cart(request.session)
            cart = remove_from_cart(cart, name)
            return redirect('/cart')
        else:
            return HttpResponse('must be logged in')


class ClearCartView(View):

    def get(self, request):
        if request.user.is_authenticated:
            cart = Cart(request.session)
            cart.clear()
            return redirect('/cart')
        else:
            return HttpResponse('login first to invest')


class CartIndexView(View):
    title = "core - Cart Page"
    template = 'index.html'
    component = "cart"

    def get(self, request):

        if request.user.is_authenticated:
            self.title = f"core - {request.user.username}'s Cart"

            print(request.session.session_key)

            cart = Cart(request.session)

            items = []

            for item in cart.items:
                items.append({'name': item.product.name, 'quantity': item.quantity, 'subtotal': float(item.subtotal)})

            total = float(cart.total)

            user = request.user.username if request.user else json.dumps(None)

            props = {
                'component': self.component,
                'items': items,
                'total': total,
                'user': user
            }

            context = {
                'title': self.title,
                'props': props
            }

            return render(request, self.template, context)
        else:
            return HttpResponse("this is the cart")
