from rest_framework import (
    generics,
    permissions,
    views,
    response,
    status,
    pagination
)

from .models import (
    Genre,
    Book,
    Author
)

from rating.models import Rating

from .serializers import (
    GenreSerializer,
    BookSerializer,
    AuthorSerializer,
    RetrieveBookSerializer,
    RetrieveGenreSerializer,
    RetrieveAuthorSerializer,
)

from django.db.models import Avg

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
        try:
            books = Book.objects.all()
            paginator = pagination.LimitOffsetPagination()
            paginator.max_limit = 100
            books_data = paginator.paginate_queryset(books, request)
            serializer = BookSerializer(books_data, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            print(e)
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def post(self, request, *args, **kwargs):
        # Create a book
        try: 
            serializer = BookSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return response.Response(serializer.data, status=status.HTTP_201_CREATED)
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class RetrieveUpdateDeleteBookView(views.APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    def get(self, request, slug):
        # Get a book with detail
        try: 
            book = Book.objects.get(slug=slug)
            average_rating = Rating.objects.filter(book=book.id).aggregate(average_rating=Avg("rating"))
            print(average_rating)
            serializer = RetrieveBookSerializer(book)
            average_rating.update(serializer.data)
            return response.Response(average_rating, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return response.Response(status=status.HTTP_502_BAD_GATEWAY)

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

class GetAllBookWithId(views.APIView):
    def get(self, request):
        books = Book.objects.all().values("id")
        return response.Response({"list_id": books}, status=status.HTTP_200_OK)
    def post(self, request):
        print()
        list_book_id = request.data.get("list_recommend_book")
        books = Book.objects.filter(id__in=list_book_id)
        serializer = BookSerializer(books, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)


### !BOOK ###