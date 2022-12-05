from rest_framework import serializers
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"
        extra_kwargs = {
            'created_date': {'read_only': True},
        }  
    def to_representation(self, instance):
        context = super().to_representation(instance)
        context['user'] = {
            "id": instance.user.id,
            "username": instance.user.username,
            "email": instance.user.email
        }
        return context