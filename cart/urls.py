from django.urls import path

from .views import CartIndexView, AddToCartView, RemoveFromCartView, ClearCartView

urlpatterns = [
    path('add/<str:name>', AddToCartView.as_view(), name="add-to-cart"),
    path('show/', CartIndexView.as_view(), name="cart-show"),
    path('remove/<str:name>', RemoveFromCartView.as_view(), name="remove-from-cart"),
    path('clear', ClearCartView.as_view(), name="clear-cart"),
    path('', CartIndexView.as_view(), name="cart-index")
]
