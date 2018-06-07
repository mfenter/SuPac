from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from inventory.models import Plot, CelestialBody
from ..serializers.plot_serializer import PlotSerializer


class PlotView(APIView):

    def get(self, request, bodyname, *args, **kwargs):

        try:
            plots = Plot.objects.filter(parent__name__iexact=bodyname)
        except Plot.DoesNotExist:
            return Response({'message': 'no plots'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PlotSerializer(plots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK, content_type="application/json")


class UserPlotsView(LoginRequiredMixin, APIView):

    login_url = '/login/'

    def get(self, request, *args, **kwargs):

        plots = Plot.objects.filter(owner=request.user)
        serializer = PlotSerializer(plots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK, content_type="application/json")


class PlotDetailView(APIView):

    def get(self, request, bodyname, geocoords, *args, **kwargs):

        try:
            plot = Plot.objects.get(parent__name__exact=bodyname, location=geocoords)
        except Plot.DoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND, content_type="application/json")
        serializer = PlotSerializer(plot)
        return Response(serializer.data, status=status.HTTP_200_OK, content_type="application/json")
