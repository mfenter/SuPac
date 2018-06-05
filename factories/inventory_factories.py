import factory
from factory.django import DjangoModelFactory

from inventory.models import CelestialBody


class CelestialBodyFactory(DjangoModelFactory):

    class Meta:
        model = CelestialBody

    name = factory.Sequence(lambda n: "Body %03d" % n)
    image_name = factory.Sequence(lambda n: "Image %03d" % n)