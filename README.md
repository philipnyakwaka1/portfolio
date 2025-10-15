# Portfolio Projects - Django Application

This repository contains my portfolio projects, all packaged in one Django application for deployment logistics. Additional applications will be included as Django apps, appended to the root project. Each app will be a fully functional project that can be detached and added into a separate Django application. All projects adhere to RESTful design principles, serving both API endpoints and static files from different modules.

## Project Structure

```
portfol-o/
├── manage.py                 # Django management script
├── portfolio_root/          # Root Django project
│   ├── settings.py          # Project settings
│   ├── urls.py              # Root URL configuration
│   ├── wsgi.py              # WSGI entry point
│   └── asgi.py              # ASGI entry point
├── portfolio_site/          # First app: Portfolio website UI
│   ├── models.py            # Data models (Project, Skill, Experience, Contact)
│   ├── views.py             # Views and API viewsets
│   ├── serializers.py       # DRF serializers
│   ├── urls.py              # App URL configuration
│   ├── admin.py             # Admin interface configuration
│   └── templates/           # HTML templates
├── static/                  # Static files (CSS, JS, images)
├── media/                   # User-uploaded media files
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Features

### Portfolio Site App
- **RESTful API**: Fully functional REST API built with Django REST Framework
- **Models**:
  - `Project`: Portfolio projects with images, URLs, and technologies
  - `Skill`: Technical skills with proficiency levels
  - `Experience`: Work experience entries
  - `Contact`: Contact form submissions
- **API Endpoints**: CRUD operations for all models
- **Admin Interface**: Django admin for easy content management
- **Static & Media Files**: Proper configuration for serving files

### Modular Architecture
Each Django app in this repository:
- Can be detached and used independently
- Has its own models, views, serializers, and URLs
- Follows RESTful design principles
- Is self-contained with minimal dependencies on the root project

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/philipnyakwaka1/portfol-o.git
cd portfol-o
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables (optional):
```bash
cp .env.example .env
# Edit .env with your settings
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser (for admin access):
```bash
python manage.py createsuperuser
```

7. Run the development server:
```bash
python manage.py runserver
```

The application will be available at `http://127.0.0.1:8000/`

## API Documentation

### Base URL
- Development: `http://127.0.0.1:8000/api/`

### Endpoints

#### Projects
- `GET /api/projects/` - List all projects
- `GET /api/projects/{id}/` - Retrieve a specific project
- Query Parameters:
  - `?featured=true` - Filter featured projects only

#### Skills
- `GET /api/skills/` - List all skills
- `GET /api/skills/{id}/` - Retrieve a specific skill
- Query Parameters:
  - `?category=Backend` - Filter by category

#### Experience
- `GET /api/experience/` - List all work experience
- `GET /api/experience/{id}/` - Retrieve a specific experience

#### Contact
- `GET /api/contact/` - List contact submissions (admin only)
- `POST /api/contact/` - Submit a new contact message
- `GET /api/contact/{id}/` - Retrieve a specific contact

### Example API Request
```bash
# Get all projects
curl http://127.0.0.1:8000/api/projects/

# Get featured projects only
curl http://127.0.0.1:8000/api/projects/?featured=true

# Submit a contact form
curl -X POST http://127.0.0.1:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello, I would like to discuss a project."
  }'
```

## Admin Interface

Access the Django admin at `http://127.0.0.1:8000/admin/` to:
- Add/edit/delete projects, skills, and experience
- View and manage contact form submissions
- Configure site settings

## Adding New Apps

To add a new Django app to this portfolio:

1. Create a new app:
```bash
python manage.py startapp new_app_name
```

2. Add the app to `INSTALLED_APPS` in `portfolio_root/settings.py`:
```python
INSTALLED_APPS = [
    # ...
    'portfolio_site',
    'new_app_name',  # Add here
]
```

3. Create the app's URL configuration and include it in `portfolio_root/urls.py`:
```python
urlpatterns = [
    # ...
    path('new-app/', include('new_app_name.urls')),
]
```

4. Design your models, views, and API endpoints following RESTful principles

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

For production, set `DEBUG=False` and configure appropriate `ALLOWED_HOSTS`.

## Static Files

In production, collect static files:
```bash
python manage.py collectstatic
```

## Testing

Run tests:
```bash
python manage.py test
```

## Deployment

This project is ready for deployment on platforms like:
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Railway
- Render

Ensure you:
1. Set `DEBUG=False` in production
2. Configure `ALLOWED_HOSTS`
3. Set up a production database (PostgreSQL recommended)
4. Configure static files serving (e.g., using WhiteNoise)
5. Set strong `SECRET_KEY`

## Technologies Used

- **Django 4.2**: Web framework
- **Django REST Framework**: RESTful API toolkit
- **Python Decouple**: Environment variable management
- **Pillow**: Image processing
- **SQLite**: Database (development)

## Contributing

This is a personal portfolio repository. However, suggestions and feedback are welcome!

## License

This project is open source and available for reference and learning purposes.

## Contact

For inquiries, please use the contact form on the website or reach out via the repository.

