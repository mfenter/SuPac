from django.contrib.auth import get_user_model, login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import viewsets
from rest_framework.compat import authenticate
from rest_framework.response import Response
from rest_framework.urls import logout
from rest_framework.utils import json
from rest_framework.views import APIView

from ..serializers.user_serializer import UserSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return Response(UserSerializer(request.user,
                context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)


class LoginView(APIView):

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs):
        return Response({})

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):

        data = json.loads(request.body)
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            if user.is_active:
                login(request, user)
                resp = Response({'status': 'true', 'username': user.username, 'fullname': user.get_full_name()},
                            status=200)
                return resp
        return Response({'status': 'false', 'message': 'user not found'}, status=404)


class LogoutView(APIView):

    def get(self, request, *args, **kwargs):
        logout(request)
        return Response({'loggedout': 'true'})
