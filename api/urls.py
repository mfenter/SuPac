
from django.urls import path

from rest_framework.routers import DefaultRouter

from .views.login_views import UserViewSet, LoginView, LogoutView
from .views.body_view import BodyView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('get-body-data/<bodyname>/', BodyView.as_view(), name='body')
]