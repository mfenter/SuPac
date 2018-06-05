from rest_framework.test import APIClient, APITestCase

from factories.django_factories import UserFactory
from factories.inventory_factories import CelestialBodyFactory, PlotFactory
from inventory.models import Plot


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


class PlotDetailTests(APITestCase):

    def setUp(self):
        self.body = CelestialBodyFactory()
        self.plots = PlotFactory.create_batch(4, **{'parent': self.body})

    def test_get_single_plot(self):
        """Should get the plot info for a single plot"""
        p = Plot.objects.all().first()
        url = '/api/get-plot-detail/{}/{}/'.format(p.parent.name, p.location)
        result = self.client.get(url)
        outcome = result.json()
        self.assertEqual(outcome['location'], p.location)
        self.assertEqual(outcome['parent'], '/api/get-body-data/{}/'.format(self.body.name))

    def test_no_such_plot(self):
        """Should return a 404 if there is no such a plot"""
        url = '/api/get-plot-detail/foo/bar/'
        result = self.client.get(url)

        self.assertEqual(result.status_code, 404)
