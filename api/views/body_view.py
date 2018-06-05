from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.body_serlizer import BodySerializer
from inventory.models import CelestialBody


class BodyView(APIView):

    def get(self, request, bodyname, *args, **kwargs):
        body = CelestialBody.objects.get(name=bodyname)
        serializer = BodySerializer(body)
        return Response(serializer.data, status=status.HTTP_200_OK)