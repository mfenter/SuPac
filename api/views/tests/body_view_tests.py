from django.test import TestCase
from rest_framework.test import APIClient

from factories.inventory_factories import CelestialBodyFactory
from inventory.models import CelestialBody


class BodyViewTests(TestCase):

    def setUp(self):
        self.body = CelestialBodyFactory()
        self.client = APIClient()

    def test_get_returns_json(self):
        """Should return json of a single body information"""
        body = CelestialBody.objects.first()
        desc = 'Test Description'
        body.description = desc
        body.save()
        expected = {'id': body.id, 'name': body.name, 'image_name': body.image_name, 'description': desc,
                    'parent_body': None, 'children': [],  'plots': '/api/get-body-plots/{}/'.format(body.name)}
        result = self.client.get('/api/get-body-data/{}/'.format(body.name))
        outcome = result.json()
        self.assertDictEqual(expected, outcome)

    def test_response_has_children(self):
        """The response should also have a 'children' section"""

        body = CelestialBody.objects.first()
        desc = 'Test Description'
        body.description = desc
        body.save()
        CelestialBodyFactory.create_batch(4, **{'parent_body': body})
        result = self.client.get('/api/get-body-data/{}/'.format(body.name))
        outcome = result.json()
        self.assertTrue('children' in outcome.keys(), "No 'children' key")

