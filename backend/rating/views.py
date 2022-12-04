from rest_framework import (
    generics,
    permissions,
    views,
    response,
    status
)

from .models import (
    Rating
)

from product.models import (
    Book
)

from .serializers import (
    RatingSerializer
)

### RATING ###

class RatingView(views.APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request, slug):
        book = Book.objects.get(slug=slug)
        all_rating = Rating.objects.filter(book=book.id)
        serializer = RatingSerializer(all_rating, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
        # Get all rating for book

    def post(self, request, slug):
        book = Book.objects.get(slug=slug)
        request.data["user"] = request.user.id
        request.data["book"] = book.id
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)