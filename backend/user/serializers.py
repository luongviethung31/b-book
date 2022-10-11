from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "username",
            "email", 
            "password", 
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }

    password = serializers.CharField(
        write_only=True,
        required=True,
        help_text='Leave empty if no change needed',
        style={'input_type': 'password', 'placeholder': 'Password'}
    )

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)


    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")
    username = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
