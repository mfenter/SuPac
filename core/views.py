import json

from django.shortcuts import render
from django.views.generic import View


class Index(View):
    title = "Home"
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
