from django.db import models
from django.contrib.auth.models import User


class CelestialBody(models.Model):

    def __str__(self):
        return self.name

    """Identifies celestial bodies"""
    name = models.CharField(max_length=26)
    parent_body = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)


class Plot(models.Model):

    def __str__(self):
        return self.name

    """Identifies a plot on a body and an owner if there is one"""
    name = models.CharField(max_length=26)
    parent = models.ForeignKey(CelestialBody, on_delete=models.PROTECT)
    location = models.CharField(max_length=140)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=500)
