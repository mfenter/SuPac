from django.http import HttpResponse
from django.views.generic import View


class Index(View):

    def get(self, request):
        return HttpResponse(
            '''<h1> This is the main index</h1>
                <p><a href="/accounts/login/">Login</a></p>
                <p><a href="/accounts/register/">Register</a></p>           
            ''')
