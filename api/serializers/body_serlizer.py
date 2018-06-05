from rest_framework.serializers import ModelSerializer

from inventory.models import CelestialBody


class BodySerializer(ModelSerializer):

    class Meta:
        model = CelestialBody
        fields = '__all__'

    def to_representation(self, instance):
        default_data = super(BodySerializer, self).to_representation(instance)
        children = CelestialBody.objects.filter(parent_body=instance)
        kids = []
        for child in children:
            kid = {'name': child.name,
                   'data': '/api/get-body-data/{}/'.format(child.name),
                   'plots': '/api/get-body-plots/{}/'.format(child.name)}
            kids.append(kid)
        default_data['children'] = kids
        if default_data['parent_body'] is not None:
            p = CelestialBody.objects.get(id=default_data['parent_body']).serializable_value('name')
            default_data['parent_body'] = '/api/get-body-data/{}/'.format(p)
        default_data['plots'] = '/api/get-body-plots/{}/'.format(instance.name)
        return default_data