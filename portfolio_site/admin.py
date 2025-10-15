from django.contrib import admin
from .models import Project, Skill, Experience, Contact


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_featured', 'order', 'created_at']
    list_filter = ['is_featured', 'created_at']
    search_fields = ['title', 'description', 'technologies']
    ordering = ['order', '-created_at']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'order']
    list_filter = ['category']
    search_fields = ['name', 'category']
    ordering = ['order', 'category', 'name']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['position', 'company', 'start_date', 'end_date', 'order']
    list_filter = ['start_date']
    search_fields = ['company', 'position', 'description']
    ordering = ['order', '-start_date']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    ordering = ['-created_at']
    readonly_fields = ['created_at']

