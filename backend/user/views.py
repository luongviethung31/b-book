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


class RegisterView(views.APIView):
    def post(self, request, *args, **kwargs):
        # Register
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            return response.Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request):
        # Login
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return response.Response(serializer.token, status=status.HTTP_202_ACCEPTED )
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(views.APIView):
    def get(self, request):
        # Get user info
        try:
            user = User.objects.get(id=request.user.id)
            serializer = UserSerializer(data=user)
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
    def post(self, request):
        pass


class UserView(views.APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(data=users, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    