from django.test import TestCase

from api.serializers.plot_serializer import PlotSerializer
from factories.django_factories import UserFactory
from factories.inventory_factories import CelestialBodyFactory, PlotFactory


class PlotsSerializerTests(TestCase):

    def setUp(self):
        self.user = UserFactory()
        self.parent = CelestialBodyFactory()

    def test_data_structure(self):
        """Do we get back all the data for a plot?"""

        plots = PlotFactory.create_batch(5, **{'parent': self.parent})

        result = PlotSerializer(plots, many=True)
        self.assertEqual(len(result.data), 5)