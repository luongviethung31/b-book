from rest_framework import (
    generics,
    permissions,
    views,
    response,
    status,
    pagination
)

from .models import (
    Rating
)

from product.models import (
    Book
)

from payment.models import OrderDetail

from .serializers import (
    RatingSerializer
)

from django.db.models import Count

### RATING ###

class RatingView(views.APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request, slug):
        try:
            book = Book.objects.get(slug=slug)
            all_rating = Rating.objects.filter(book=book.id)
            count = all_rating.count()
            paginator = pagination.LimitOffsetPagination()
            paginator.max_limit = 100
            rating_data = paginator.paginate_queryset(all_rating, request)
            serializer = RatingSerializer(rating_data, many=True)
            return response.Response({'count' : count, 'results':serializer.data}, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return response.Response({"message": "This book is not exist"} ,status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, slug):
        try:
            book = Book.objects.get(slug=slug)
            request.data["user"] = request.user.id
            request.data["book"] = book.id
            check_condition_to_vote = OrderDetail.objects.filter(order__user=request.user.id, book=book.id).first()
            if not check_condition_to_vote:
                return response.Response({
                    "message": "You must buy this book first"
                }, status=status.HTTP_406_NOT_ACCEPTABLE)
            serializer = RatingSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return response.Response(serializer.data, status=status.HTTP_201_CREATED)
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return response.Response({"message": "This book is not exist"} ,status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RatingStatistic(views.APIView):
    def get(self, request, slug):
        try:
            book = Book.objects.get(slug=slug)
            rating_data = Rating.objects.filter(book=book.id).values('rating').order_by('rating').annotate(quantity=Count('rating'))
            return response.Response(rating_data,status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return response.Response({"message": "This book is not exist"} ,status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)