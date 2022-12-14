from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
import re
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "username",
            "email",
            "phone",
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

    def validate_username(self, value):
        if len(value)<6 or len(value) > 50:
           raise serializers.ValidationError("Username length must be from 7 to 50")
        if " " in value:
            raise serializers.ValidationError("Username must be not contain space")
        return value

    def validate_phone(self, value):
        if len(value)<10 or len(value) > 12:
            raise serializers.ValidationError("Phone number must be from 10 to 11")
        if not CheckIsPhoneNumber(value):
            raise serializers.ValidationError("Phone number not in right format")
        return value

    def validate_password(self, value):
        if len(value)<9:
           raise serializers.ValidationError("Password length must be greater than 8")
        if not value.isascii():
            raise serializers.ValidationError("Password contains invalid character")
        if not any(map(str.isdigit, value)):
            raise serializers.ValidationError("Password must be contain at least one number")
        if not bool(re.match('^(?=.*[0-9]$)(?=.*[a-zA-Z])', value)):
            raise serializers.ValidationError("Password contains at least one letter")
        if not re.fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', value):
            raise serializers.ValidationError("Password is invalid")
        return value

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

class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        if len(value)<9:
           raise serializers.ValidationError("Password length must be greater than 8")
        if not value.isascii():
            raise serializers.ValidationError("Password contains invalid character")
        if not any(map(str.isdigit, value)):
            raise serializers.ValidationError("Password must be contain at least one number")
        if not bool(re.match('^(?=.*[0-9]$)(?=.*[a-zA-Z])', value)):
            raise serializers.ValidationError("Password contains at least one letter")
        if not re.fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', value):
            raise serializers.ValidationError("Password is invalid")
        return value
    

def CheckIsPhoneNumber(phone_text): 
    x = re.search(r"(84|0[3|5|7|8|9])+([0-9]{8}\b)", phone_text)
    return x