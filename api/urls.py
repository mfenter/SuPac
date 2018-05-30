
from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import UserViewSet, FFLoginView, FFLogoutView, FooPage

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('login/', FFLoginView.as_view(), name='login'),
    path('logout/', FFLogoutView.as_view(), name='logout'),
]