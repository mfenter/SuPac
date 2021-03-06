import logging
import os
import json

from django.shortcuts import render, redirect
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

from inventory.models import Plot

from carton.cart import Cart

from .process_card import process_card


class PaymentFormView(View):
    title = "core - Payment Form"
    template = 'index.html'
    component = 'payment-form'

    def get(self, request):
        if request.user.is_authenticated:
            cart = Cart(request.session)
            amount = 0

            if cart.total > 0:
                amount = float(cart.total)

            props = {
                'component': self.component,
                'amount': amount,
                'user': request.user.username
            }

            context = {
                'title': self.title,
                'props': props,
            }

            return render(request, self.template, context)
        else:
            redirect('/')


class ProcessCardView(View):

    def post(self, request):
        cart = Cart(request.session)
        total = cart.total
        print(request.POST)

        nonce = request.POST.get('nonce')

        if nonce is not None:
            res = process_card(nonce, total)
            # TODO: This should not be checking the type. We should wrap "process_card" into a try/except. If there
            # is an exception log it and then return the HttpResponse.

            if type(res) == Exception:  # NOTE: This won't even work. if we wanted to do this we should use isinstance
                return HttpResponse('There was an issue with processing. Check your card details and try again.')
            else:
                for product in cart.products:
                    plot = Plot.objects.get(name=product.name)
                    plot.owner = request.user
                    plot.save()
                    print(plot.owner)

                cart.clear()

                return HttpResponse(f'''
                <h1>Thanks for your investment!</h1>
                <p>Transaction id: {res.id}</p>
                <p><a href="/inventory/">Get More Real Estate!</a></p>
                ''')

        return redirect('/merchant/')
