from rest_framework.serializers import ModelSerializer

from inventory.models import Plot, CelestialBody


class PlotSerializer(ModelSerializer):

    class Meta:
        model = Plot
        fields = '__all__'

    def to_representation(self, instance):
        default_data = super(PlotSerializer, self).to_representation(instance)
        parent_name = CelestialBody.objects.get(id=default_data['parent']).serializable_value('name')
        default_data['parent'] = '/api/get-body-data/{}/'.format(parent_name)
        return default_data