from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Skill, Experience, Contact
from .serializers import (
    ProjectSerializer, SkillSerializer, 
    ExperienceSerializer, ContactSerializer
)


def home(request):
    """Home page view"""
    return render(request, 'portfolio_site/home.html')


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing projects.
    Provides list and detail endpoints.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        """Optionally filter by featured projects"""
        queryset = Project.objects.all()
        featured = self.request.query_params.get('featured', None)
        if featured is not None and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        return queryset


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing skills.
    Provides list and detail endpoints.
    """
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def get_queryset(self):
        """Optionally filter by category"""
        queryset = Skill.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category__icontains=category)
        return queryset


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing work experience.
    Provides list and detail endpoints.
    """
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for contact form submissions.
    Allows creating new contacts and viewing (for admin).
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    http_method_names = ['get', 'post', 'head', 'options']

    def create(self, request, *args, **kwargs):
        """Create a new contact submission"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Thank you for your message! I will get back to you soon.'},
            status=status.HTTP_201_CREATED
        )

