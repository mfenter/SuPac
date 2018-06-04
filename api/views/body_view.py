from rest_framework.response import Response
from rest_framework.views import APIView


class BodyView(APIView):

    def get(self, request, bodyname, *args, **kwargs):
        bodies = BodySerializer(bodyname)
        return Response(bodies.data)