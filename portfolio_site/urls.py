from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'portfolio_site'

urlpatterns = [
    path('', views.home, name='home')
]
