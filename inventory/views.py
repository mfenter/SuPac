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
            # Grab Celestial Bodies who have no parents
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

        cart = Cart(request.session)

        in_cart = False

        try:
            plot = Plot.objects.get(name=name)
            if cart.__contains__(plot):
                in_cart = True
        except Plot.DoesNotExist:
            return redirect('/inventory/')



        # response = HttpResponse(f'''
        #     <div>
        #         <h1><u>{plot.name}</u></h1>
        #         <h3>{plot.owner}</h3>
        #         <p>{plot.description}</p>
        #     </div>
        # ''')

        # if plot.owner is None and cart.products.__contains__(plot) is False:
        #     response.writelines(f"<p><a href='/cart/add/{plot.name}'>Buy this interstellar Land</a></p>\n")
        #
        # if cart.products.__contains__(plot):
        #     response.writelines(f'''
        #         <p><a href='/cart/remove/{plot.name}'>Remove {plot.name} from cart</a></p>\n
        #     ''')

        props = {
            "name": plot.name,
            "owner": plot.owner.username,
            "desc": plot.description,
            "in_cart": in_cart
        }

        context = {
            "title": self.title,
            "props": props
        }

        return render(request, self.template, context)
