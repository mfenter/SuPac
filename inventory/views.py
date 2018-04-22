from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

from inventory.models import CelestialBody

# Create your views here.


class Index(View):

    def get(self, request):
        primary_bodies = CelestialBody.objects.filter(parent_body__celestialbody__isnull=True)
        body_list = []

        for body in primary_bodies:
            body_list.append(f'<a href="/inventory/celestial_body/{body.name}">{body.name}</a><br/>')

        return HttpResponse(body_list)


class CelestialBodyView(View):

    def get(self, request, name):
        # grab celestial body from request
        # grab any celestial bodies and plots under it
        celestial_bodies = CelestialBody.objects.filter(name=name)
        body_list = []

        for body in celestial_bodies:
            body_list.append(f'<a href="/inventory/celestial_body/{body.name}">{body.name}</a><br/>')

        return HttpResponse(body_list)


class PlotView(View):

    def get(self, request):
        pass
