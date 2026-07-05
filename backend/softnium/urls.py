from django.urls import path
from .views import RegisterAPIView, LoginAPIView, DashboardAPIView, ClientAPIView, ClientDetailAPIView, PaymentAPIView, PaymentDetailAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/',LoginAPIView.as_view(), name='login'),
    path('dashboard/',DashboardAPIView.as_view(), name='dashboard'),
    path('clients/', ClientAPIView.as_view(), name='clients'),
    path('clients/<int:pk>/', ClientDetailAPIView.as_view(), name='client-detail'),
    path('payments/', PaymentAPIView.as_view(), name='payments'),
    path('payments/<int:pk>/', PaymentDetailAPIView.as_view(), name='payment-detail'),
]