from rest_framework import serializers
from .models import Project, Skill, Experience, Contact


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model"""
    technologies_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'image', 'url', 'github_url',
            'technologies', 'technologies_list', 'created_at', 'updated_at',
            'is_featured', 'order'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_technologies_list(self, obj):
        """Convert comma-separated technologies to list"""
        if obj.technologies:
            return [tech.strip() for tech in obj.technologies.split(',')]
        return []


class SkillSerializer(serializers.ModelSerializer):
    """Serializer for Skill model"""
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'proficiency', 'icon', 'order']


class ExperienceSerializer(serializers.ModelSerializer):
    """Serializer for Experience model"""
    is_current = serializers.ReadOnlyField()

    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'position', 'description', 'start_date',
            'end_date', 'location', 'is_current', 'order'
        ]


class ContactSerializer(serializers.ModelSerializer):
    """Serializer for Contact model"""
    
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'is_read']
        read_only_fields = ['created_at', 'is_read']
