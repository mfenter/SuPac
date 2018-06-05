from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from inventory.models import Plot, CelestialBody
from ..serializers.plot_serializer import PlotSerializer


class PlotView(APIView):

    def get(self, request, bodyname, *args, **kwargs):
        body = CelestialBody.objects.get(name=bodyname)
        plots = Plot.objects.filter(parent=body)
        serializer = PlotSerializer(plots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK, content_type="application/json")


class UserPlotsView(LoginRequiredMixin, APIView):

    login_url = '/login/'

    def get(self, request, *args, **kwargs):

        plots = Plot.objects.filter(owner=request.user)
        serializer = PlotSerializer(plots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK, content_type="application/json")

