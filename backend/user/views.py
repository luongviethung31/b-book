from rest_framework import (
    views,
    permissions,
    status,
    response,
)
from .models import (
    User
)

from .serializers import (
    UserSerializer,
    UserLoginSerializer
)

from rest_framework.authtoken.models import Token
from django.contrib import auth


class RegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        # Register
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response({"message": "Register successful"}, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        # Login
        try:
            serializer = UserLoginSerializer(data=request.data)
            if serializer.is_valid():
                user = auth.authenticate(
                    request,
                    username=serializer.validated_data['username'],
                    password=serializer.validated_data['password']
                )
                if (user):
                    Token.objects.filter(user=user).delete()
                    token = Token.objects.create(user=user)
                    auth.login(request, user)
                    return response.Response({
                        "token": token.key
                        }, status=status.HTTP_200_OK)
                else:
                    return response.Response({
                        "error_message": "Email or password is incorrect"
                        }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response({
                    "error_message": "Email or password is invalid"
                    }, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        # Get user info
        try:
            user = User.objects.get(pk=request.user.id)
            serializer = UserSerializer(user)
            return response.Response(serializer.data, status=status.HTTP_200_OK) 
        except User.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        # Update user info
        try:
            user = User.objects.get(id=request.user.id)
            serializer = UserSerializer(data=request.data, instance=user)
            if serializer.is_valid():
                return response.Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

class LogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        request.user.auth_token.delete()
        auth.logout(request)
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class UserView(views.APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(data=users, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    