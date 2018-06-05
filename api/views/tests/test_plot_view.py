from rest_framework.test import APIClient, APITestCase

from factories.django_factories import UserFactory
from factories.inventory_factories import CelestialBodyFactory, PlotFactory


class PlotViewTests(APITestCase):

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


class UserPlotsViewTests(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.creds = {'username': 'plotsuser', 'password': 'pass'}
        self.user = UserFactory(**self.creds)
        self.body = CelestialBodyFactory()
        self.plots = PlotFactory.create_batch(4, **{'parent': self.body, 'owner': self.user})
        PlotFactory.create_batch(4, **{'parent': self.body})

    def test_redirect_if_not_loggedin(self):
        """It should redirect to 'login' if the user is not logged in"""

        result = self.client.get('/api/get-user-plots/')
        self.assertEqual(result.status_code, 302)
        self.assertEqual(result.url, "/login/?next=/api/get-user-plots/")

    def test_get_only_user_plots(self):
        """It should only return the plots for our user"""

        self.client.login(**self.creds)
        result = self.client.get('/api/get-user-plots/')
        outcome = result.json()
        self.assertEqual(len(outcome), 4)
        for o in outcome:
            self.assertEqual(o['owner'], self.user.id)
