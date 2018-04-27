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

# Create your views here.


class PaymentFormView(View):

    def get(self, request):
        template_name = "merchant/process_card_form.html"
        context = {}

        cart = Cart(request.session)

        amount = 0

        if cart.total > 0:
            amount = cart.total

        context['amount'] = amount

        return render(request, template_name, context)

        # try:
        #     print(settings.BASE_DIR)
        #     with open(os.path.join(settings.BASE_DIR, "merchant/public/", "process_card_form.html")) as f:
        #         return HttpResponse(f.read())
        #
        # except FileNotFoundError:
        #     logging.exception("index file not found")
        #     return HttpResponse('<h1>Not the right merchant page</h1>', status=501)


class ProcessCardView(View):

    def post(self, request):
        cart = Cart(request.session)
        total = cart.total
        print(request.POST)

        nonce = request.POST.get('nonce')

        if nonce is not None:
            res = process_card(nonce, total)
            if type(res) == Exception:
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
