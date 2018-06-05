from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers.plot_serializer import PlotSerializer
from inventory.models import Plot, CelestialBody


class PlotView(APIView):

    def get(self, request, bodyname, *args, **kwargs):
        body = CelestialBody.objects.get(name=bodyname)
        plots = Plot.objects.filter(parent=body)
        serializer = PlotSerializer(plots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK, content_type="application/json")