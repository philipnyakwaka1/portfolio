# Portfolio Site App - Standalone Usage Guide

This guide explains how to detach the `portfolio_site` app and use it in another Django project.

## Detaching the App

The `portfolio_site` app is designed to be modular and can be used independently in any Django project.

### Files to Copy

1. Copy the entire `portfolio_site/` directory to your target project
2. Optionally copy the app's templates if you want to use them

### Integration Steps

1. **Add to INSTALLED_APPS** in your project's `settings.py`:
```python
INSTALLED_APPS = [
    # ... other apps
    'rest_framework',  # Required dependency
    'portfolio_site',
]
```

2. **Configure REST Framework** (if not already configured):
```python
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}
```

3. **Add URL patterns** in your project's main `urls.py`:
```python
from django.urls import path, include

urlpatterns = [
    # ... other patterns
    path('portfolio/', include('portfolio_site.urls')),
]
```

4. **Run migrations**:
```bash
python manage.py makemigrations portfolio_site
python manage.py migrate
```

5. **Create a superuser and add content** (if needed):
```bash
python manage.py createsuperuser
```

### Dependencies

Ensure these packages are in your `requirements.txt`:
```
Django>=4.2
djangorestframework>=3.14.0
Pillow>=10.0.0
```

### Media Files Configuration

Add to your `settings.py`:
```python
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

And in your `urls.py`:
```python
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## Available Models

- **Project**: Portfolio projects with images and links
- **Skill**: Technical skills with proficiency levels
- **Experience**: Work experience entries
- **Contact**: Contact form submissions

## API Endpoints

After integration, the following endpoints will be available:

- `GET /portfolio/api/projects/` - List projects
- `GET /portfolio/api/projects/{id}/` - Project detail
- `GET /portfolio/api/skills/` - List skills
- `GET /portfolio/api/experience/` - List experience
- `POST /portfolio/api/contact/` - Submit contact form

## Customization

### Models
You can extend or modify the models in `portfolio_site/models.py` as needed.

### Views
Modify `portfolio_site/views.py` to add custom logic or additional endpoints.

### Serializers
Update `portfolio_site/serializers.py` to change API response format.

### Templates
Customize the templates in `portfolio_site/templates/` to match your design.

## Testing

Run tests specific to this app:
```bash
python manage.py test portfolio_site
```

## Notes

- The app uses Django REST Framework for API functionality
- All models are registered in Django Admin for easy management
- The app is fully self-contained with minimal dependencies
- Static files are served from the app's static directory
