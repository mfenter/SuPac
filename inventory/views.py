from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

from inventory.models import CelestialBody, Plot

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
        celestial_bodies = CelestialBody.objects.filter(parent_body__name=name)
        body_list = []

        plots = Plot.objects.filter(parent__name=name)
        plot_list = []

        for body in celestial_bodies:
            body_list.append(f'<a href="/inventory/celestial_body/{body.name}">{body.name}</a><br/>')

        for plot in plots:
            plot_list.append(f'<a href="/inventory/celestial_body/plots/{plot.name}">{plot.name}</a><br/>')

        response = HttpResponse()
        response.writelines(body_list)
        response.writelines(plot_list)
        return response


class PlotView(View):

    def get(self, request, name):
        plot = Plot.objects.get(name=name)

        return HttpResponse(f'''
            <div>
                <h1><u>{plot.name}</u></h1>
                <h3>{plot.owner}</h3>
                <p>{plot.description}</p>
            </div
        ''')