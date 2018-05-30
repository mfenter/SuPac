
from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import UserViewSet, LoginView, LogoutView, FooView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]