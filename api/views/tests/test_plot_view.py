from django.test import TestCase
from rest_framework.test import APIClient

from factories.inventory_factories import CelestialBodyFactory, PlotFactory


class BodyViewTests(TestCase):

    def setUp(self):
        self.body = CelestialBodyFactory()
        self.client = APIClient()

    def test_get_returns_json(self):
        """Should return json of a single body information"""
        plot = PlotFactory(parent=self.body)
        desc = 'Test Description'

        self.body.description = desc
        self.body.save()
        expected = {'id': self.body.id, 'name': self.body.name, 'image_name': self.body.image_name,
                    'description': desc, 'parent_body': None, 'children': [],
                    'plots': '/api/get-body-plots/{}/'.format(self.body.name)}
        result = self.client.get('/api/get-body-plots/{}/'.format(self.body.name))
        outcome = result.json()
        self.assertEqual(len(outcome), 1)
        self.assertEqual(outcome[0]['name'], plot.name)
