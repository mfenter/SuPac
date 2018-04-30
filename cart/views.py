from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.views.generic import View

from carton.cart import Cart
from inventory.models import Plot


def add_to_cart(cart, name):
    qty = 1
    plot = Plot.objects.get(name=name)

    if cart.products.__contains__(plot):
        return cart
    else:
        cart.add(plot, price=plot.price, quantity=qty)

    return cart


def remove_from_cart(cart, name):
    plot = Plot.objects.get(name=name)
    cart.remove(plot)
    return cart


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
    title = "SuPac - Cart Page"
    template = 'index.html'
    component = "cart"

    def get(self, request):

        if request.user.is_authenticated:
            self.title = f"SuPac - {request.user.name}'s Cart"

            props = {
                'component': self.component
            }

            context = {
                'title': self.title,
                'props': props
            }

            cart = Cart(request.session)

            context['cart'] = cart.items
            return render(request, self.template, context)
        else:
            return HttpResponse("this is the cart")


