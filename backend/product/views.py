from rest_framework import (
    generics,
    permissions,
    views,
    response,
    status
)

from .models import (
    Genre,
    Book,
    Author
)

from .serializers import (
    GenreSerializer,
    BookSerializer,
    AuthorSerializer,
    RetrieveBookSerializer,
    RetrieveGenreSerializer,
    RetrieveAuthorSerializer
)

### CUSTOM PERMISSION ### 

class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if (request.method in permissions.SAFE_METHODS or bool(request.user and request.user.is_staff)):
            return True
        return False

### GENRE ###

class ListCreateGenreView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, *args, **kwargs):
        # Get all genre
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres,many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, *args, **kwargs):
        # Create a genre
        serializer = GenreSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)

class RetrieveUpdateDeleteGenreView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, *args, **kwargs):
        # Get a genre with detail
        pass
    def put(self, request, *args, **kwargs):
        # Update a genre by send all field
        pass
    def delete(self, request, *args, **kwargs):
        # Delete a genre
        pass

### !GENRE ###

### AUTHOR ###

class ListCreateAuthorView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, *args, **kwargs):
        # Get all author
        pass
    def post(self, request, *args, **kwargs):
        # Create a author
        pass

class RetrieveUpdateDeleteAuthorView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, *args, **kwargs):
        # Get a author with detail
        pass
    def put(self, request, *args, **kwargs):
        # Update a author by send all field
        pass
    def delete(self, request, *args, **kwargs):
        # Delete a author
        pass


### !AUTHOR ###

### BOOK ###

class ListCreateBookView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, *args, **kwargs):
        # Get all book
        pass
    def post(self, request, *args, **kwargs):
        # Create a book
        pass

class RetrieveUpdateDeleteBookView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, *args, **kwargs):
        # Get a book with detail
        pass
    def put(self, request, *args, **kwargs):
        # Update a book by send all field
        pass
    def delete(self, request, *args, **kwargs):
        # Delete a book
        pass

### !BOOK ###