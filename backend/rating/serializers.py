from rest_framework import serializers
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"
        extra_kwargs = {
            'created_date': {'read_only': True},
        }  
