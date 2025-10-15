from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Project, Skill, Experience, Contact


class ProjectModelTest(TestCase):
    """Test the Project model"""

    def setUp(self):
        self.project = Project.objects.create(
            title="Test Project",
            description="Test Description",
            technologies="Python, Django, REST",
            is_featured=True,
            order=1
        )

    def test_project_creation(self):
        """Test that a project can be created"""
        self.assertEqual(self.project.title, "Test Project")
        self.assertEqual(self.project.is_featured, True)

    def test_project_str(self):
        """Test the string representation"""
        self.assertEqual(str(self.project), "Test Project")


class ProjectAPITest(APITestCase):
    """Test the Project API endpoints"""

    def setUp(self):
        self.project = Project.objects.create(
            title="API Test Project",
            description="Test Description",
            technologies="Python, Django",
            is_featured=True
        )

    def test_get_projects_list(self):
        """Test retrieving list of projects"""
        url = reverse('portfolio_site:project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_get_project_detail(self):
        """Test retrieving a single project"""
        url = reverse('portfolio_site:project-detail', args=[self.project.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "API Test Project")

    def test_filter_featured_projects(self):
        """Test filtering featured projects"""
        Project.objects.create(
            title="Non-featured Project",
            description="Test",
            technologies="Test",
            is_featured=False
        )
        url = reverse('portfolio_site:project-list')
        response = self.client.get(url, {'featured': 'true'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)


class ContactAPITest(APITestCase):
    """Test the Contact API endpoints"""

    def test_create_contact(self):
        """Test creating a contact submission"""
        url = reverse('portfolio_site:contact-list')
        data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'subject': 'Test Subject',
            'message': 'Test message'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)

    def test_list_contacts(self):
        """Test retrieving list of contacts"""
        Contact.objects.create(
            name='Test User',
            email='test@example.com',
            subject='Test',
            message='Test message'
        )
        url = reverse('portfolio_site:contact-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

