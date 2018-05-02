from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import View

from carton.cart import Cart

from inventory.models import CelestialBody, Plot

# Create your views here.


class Index(View):
    title = "SuPac - Celestial Real Estate"
    template = "index.html"
    component = "inventory-index"

    def get(self, request):
        if request.user.is_authenticated:
            primary_bodies = CelestialBody.objects.filter(parent_body__celestialbody__isnull=True)
            body_list = []

            for body in primary_bodies:
                body_list.append(body.name)
                # body_list.append(f'<a href="/inventory/celestial_body/{body.name}">{body.name}</a><br/>')

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
        celestial_bodies = CelestialBody.objects.filter(parent_body__name=name)
        body_list = []

        plots = Plot.objects.filter(parent__name=name)
        plot_list = []

        for body in celestial_bodies:
            body_list.append(body.name)

        for plot in plots:
            plot_list.append(plot.name)

        props = {
            "component": self.component,
            "body_list": body_list,
            "plot_list": plot_list
        }

        context = {
            "title": self.title,
            "props": props
        }

        # response = HttpResponse()
        # response.writelines(body_list)
        # response.writelines(plot_list)
        return render(request, self.template, context)


class PlotView(View):

    def get(self, request, name):
        plot = Plot.objects.get(name=name)
        cart = Cart(request.session)
        response = HttpResponse(f'''
            <div>
                <h1><u>{plot.name}</u></h1>
                <h3>{plot.owner}</h3>
                <p>{plot.description}</p>
            </div
        ''')

        if plot.owner is None and cart.products.__contains__(plot) is False:
            response.writelines(f"<p><a href='/cart/add/{plot.name}'>Buy this interstellar Land</a></p>\n")

        if cart.products.__contains__(plot):
            response.writelines(f'''
                <p><a href='/cart/remove/{plot.name}'>Remove {plot.name} from cart</a></p>\n
            ''')

        return response
