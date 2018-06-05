import factory
from django.contrib.auth import get_user_model
from factory import Sequence
from factory.django import DjangoModelFactory

User = get_user_model()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    username = Sequence(lambda n: 'user_%d' % n)
    password = factory.PostGenerationMethodCall('set_password', 'pass')