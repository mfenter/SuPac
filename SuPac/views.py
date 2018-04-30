from django.shortcuts import render
from django.views.generic import View


class Index(View):
    title = "SuPac Home"
    template = 'index.html'
    component = 'home'

    def get(self, request):

        props = {
            'component': self.component
        }

        context = {
            'title': self.title,
            'props': props
        }

        return render(request, self.template, context)

        # return HttpResponse(
        #     '''<h1> This is the main index</h1>
        #         <p><a href="/accounts/login/">Login</a></p>
        #         <p><a href="/accounts/register/">Register</a></p>
        #     ''')
