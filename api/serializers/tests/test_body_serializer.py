from django.test import TestCase

from api.serializers.body_serlizer import BodySerializer
from factories.inventory_factories import CelestialBodyFactory
from inventory.models import CelestialBody


class BodySerializerTests(TestCase):

    def setUp(self):

        CelestialBodyFactory.create_batch(4)

    def test_serializer_json(self):
        """The body serializer should produce an orderd list"""
        bodies = CelestialBody.objects.all().order_by('id')
        result = BodySerializer(bodies, many=True)
        self.assertEqual(len(result.data), len(bodies))

    def test_result_has_children_key(self):
        """
        The body serializer should have a 'children' key
        """
        body = CelestialBody.objects.first()
        desc = 'Test Description'
        body.description = desc
        body.save()
        CelestialBodyFactory.create_batch(4, **{'parent_body': body})

        result = BodySerializer(body)
        self.assertTrue('children' in result.data)

    def test_returns_plots(self):
        """It should provide a path to get the plots for a given body"""

        parent = CelestialBody.objects.first()
        result = BodySerializer(parent)
        expected = 'plots'
        self.assertIn(expected, result.data.keys())
        expected = '/api/get-body-plots/{}/'.format(parent.name)
        self.assertEqual(expected, result.data['plots'])

    def test_parent_is_path(self):
        """It should turn the parent into a path IF the parent exists"""

        parent = CelestialBody.objects.first()
        kid = CelestialBodyFactory(parent_body=parent)

        expected = '/api/get-body-data/{}/'.format(parent.name)
        result = BodySerializer(kid)
        self.assertEqual(expected, result.data['parent_body'])
