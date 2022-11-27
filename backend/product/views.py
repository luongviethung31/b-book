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
        # TODO: need to paginate
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres,many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, *args, **kwargs):
        # Create a genre
        serializer = GenreSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RetrieveUpdateDeleteGenreView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, slug):
        # Get a genre by slug
        try: 
            genres = Genre.objects.get(slug=slug)
            serializer = RetrieveGenreSerializer(genres)
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Genre.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, slug):
        # Update a genre by send all field
        try: 
            genre = Genre.objects.get(slug=slug)
            serializer = RetrieveGenreSerializer(genre, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Genre.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, slug):
        # Delete a genre
        try: 
            genres = Genre.objects.get(slug=slug)
            genres.delete()
            return response.Response(status=status.HTTP_204_NO_CONTENT)
        except Genre.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

### !GENRE ###

### AUTHOR ###

class ListCreateAuthorView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, *args, **kwargs):
        # Get all author    
        # TODO: need to paginate
        author = Author.objects.all()
        serializer = AuthorSerializer(author,many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        # Create a author
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RetrieveUpdateDeleteAuthorView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, slug):
        # Get a author with detail
        try: 
            author = Author.objects.get(slug=slug)
            serializer = RetrieveAuthorSerializer(author)
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Author.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, slug):
        # Update a author by send all field
        try: 
            author = Author.objects.get(slug=slug)
            serializer = RetrieveAuthorSerializer(author, data=request.data)
            if serializer.is_valid():
                return response.Response(serializer.data, status=status.HTTP_200_OK)
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Author.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def delete(self, request, slug):
        # Delete a author
        try: 
            author = Author.objects.get(slug=slug)
            author.delete()
            return response.Response(status=status.HTTP_204_NO_CONTENT)
        except Author.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


### !AUTHOR ###

### BOOK ###

class ListCreateBookView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, *args, **kwargs):
        # Get all book
        # TODO: need to paginate
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        # Create a book
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RetrieveUpdateDeleteBookView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, slug):
        # Get a book with detail
        try: 
            book = Book.objects.get(slug=slug)
            serializer = RetrieveBookSerializer(book)
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, slug):
        # Update a book by send all field
        try: 
            book = Book.objects.get(slug=slug)
            serializer = RetrieveBookSerializer(book, data=request.data)
            if serializer.is_valid():
                return response.Response(serializer.data, status=status.HTTP_200_OK)
            return response.Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)  
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def delete(self, request, slug):
        # Delete a book
        try: 
            book = Book.objects.get(slug=slug)
            book.delete()
            return response.Response(status=status.HTTP_204_NO_CONTENT)
        except Author.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

### !BOOK ###