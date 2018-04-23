from .views import PaymentFormView, ProcessCardView
from django.urls import path

urlpatterns = [
    path('', PaymentFormView.as_view(), name='payment-form'),
    path('process_card/', ProcessCardView.as_view(), name='process-card')
]
