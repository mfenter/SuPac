import json

from django.shortcuts import render, redirect
from django.views.generic import View

from carton.cart import Cart

from inventory.models import CelestialBody, Plot


class Index(View):
    title = "SuPac - Celestial Real Estate"
    template = "index.html"
    component = "inventory-index"

    def get(self, request):
        if request.user.is_authenticated:
            # Grab Celestial Bodies who have no parents
            primary_bodies = CelestialBody.objects.filter(parent_body__celestialbody__isnull=True)

            body_list = []

            for body in primary_bodies:
                body_list.append(body.name)

            props = {
                "component": self.component,
                "body_list": body_list,
                "plot_list": []
            }

            context = {
                "title": self.title,
                "props": props
            }

            return render(request, self.template, context)
        else:
            return redirect('/')


class CelestialBodyView(View):
    title = "Supac - Celestial Body View"
    template = "index.html"
    component = "celestial_body_view"

    def get(self, request, name):
        # grab celestial body from request
        # grab any celestial bodies and plots under it
        plot_list = []
        body_list = []

        try:
            celestial_bodies = CelestialBody.objects.filter(parent_body__name=name)
            for body in celestial_bodies:
                body_list.append(body.name)
        except CelestialBody.DoesNotExist:
            pass

        try:
            plots = Plot.objects.filter(parent__name=name)
            for plot in plots:
                plot_list.append(plot.name)
        except Plot.DoesNotExist:
            pass

        props = {
            "component": self.component,
            "body_list": body_list,
            "plot_list": plot_list
        }

        context = {
            "title": self.title,
            "props": props
        }

        return render(request, self.template, context)


class PlotView(View):
    title = "Supac - Celestial Plot View"
    template = "index.html"
    component = "plot_view"

    def get(self, request, name):

        if request.user.is_authenticated:
            cart = Cart(request.session)

            in_cart = False
            owner = None

            try:
                plot = Plot.objects.get(name=name)
                if cart.__contains__(plot):
                    in_cart = True
            except Plot.DoesNotExist:
                return redirect('/inventory/')

            owner = plot.owner.username if plot.owner else json.dumps(None)
            user = request.user.username if request.user else json.dumps(None)

            props = {
                "name": plot.name,
                "owner": owner,
                "desc": plot.description,
                "in_cart": in_cart,
                "user": user
            }

            context = {
                "title": self.title,
                "props": props
            }

            return render(request, self.template, context)
        else:
            return redirect('/')
