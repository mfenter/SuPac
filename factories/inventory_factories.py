import factory
from factory.django import DjangoModelFactory

from inventory.models import CelestialBody, Plot


class CelestialBodyFactory(DjangoModelFactory):

    class Meta:
        model = CelestialBody

    name = factory.Sequence(lambda n: "Body %03d" % n)
    image_name = factory.Sequence(lambda n: "Image %03d" % n)


class PlotFactory(DjangoModelFactory):

    class Meta:
        model = Plot

    location = factory.Sequence(lambda n: "%04d" % n)