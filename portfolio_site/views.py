from django.shortcuts import render


def home(request):
    """Home page view"""
    return render(request, 'portfolio_site/home.html')
