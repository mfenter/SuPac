import json

from django.shortcuts import render
from django.views.generic import View


class Index(View):
    title = "SuPac Home"
    template = 'index.html'
    component = 'home'

    def get(self, request):

        user = None

        if request.user.is_authenticated:
            user = request.user.username if request.user.is_authenticated else json.dumps(None)

        props = {
            'component': self.component,
            'user': user
        }

        context = {
            'title': self.title,
            'props': props,
        }

        return render(request, self.template, context)

        # return HttpResponse(
        #     '''<h1> This is the main index</h1>
        #         <p><a href="/accounts/login/">Login</a></p>
        #         <p><a href="/accounts/register/">Register</a></p>
        #     ''')
