import logging
import os

from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

from .process_card import process_card

# Create your views here.


class PaymentFormView(View):

    def get(self):
        try:
            print(settings.BASE_DIR)
            with open(os.path.join(settings.BASE_DIR, "merchant/public/", "process_card_form.html")) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception("index file not found")
            return HttpResponse('<h1>Not the right merchant page</h1>', status=501)


class ProcessCardView(View):

    def post(self, request):
        res = process_card()
        return HttpResponse(res)
