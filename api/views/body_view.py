from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.body_serlizer import BodySerializer
from inventory.models import CelestialBody


class BodyView(APIView):

    def get(self, request, bodyname, *args, **kwargs):
        try:
            body = CelestialBody.objects.get(name__iexact=bodyname)
        except CelestialBody.DoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        serializer = BodySerializer(body)
        return Response(serializer.data, status=status.HTTP_200_OK)