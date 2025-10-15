from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router for REST API endpoints
router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'skills', views.SkillViewSet, basename='skill')
router.register(r'experience', views.ExperienceViewSet, basename='experience')
router.register(r'contact', views.ContactViewSet, basename='contact')

app_name = 'portfolio_site'

urlpatterns = [
    # Homepage
    path('', views.home, name='home'),
    # API endpoints
    path('api/', include(router.urls)),
]
