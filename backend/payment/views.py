from rest_framework import (
    generics,
    permissions,
    views,
    response,
    status
)

from .models import (
    OrderDetail,
    Order
)

from product.models import Book

from .serializers import (
    OrderSerializer,
    OrderDetailSerializer,
    BookOrderedSerializer
)


### ORDER ###

class CreateOrderView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request): 
        # get all order by user id
        try:
            order = Order.objects.filter(user__pk=request.user.pk)
            serializer = OrderSerializer(data=order, many=True) 
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        # create new order
        books = request.data.get('product')
        order = {
            'ship_date': request.data.get('ship_date'),
            'ship_place': request.data.get('ship_place'),
            'note': request.data.get('note'),
            'is_paid': request.data.get('is_paid'),
            'paid_at': request.data.get('paid_at'),
            "user": request.user
        }
        orderSerializer = OrderSerializer(data=order)
        if not orderSerializer.is_valid():
            return response.Response(orderSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        errorlist = []
        for index, item in books:
            item_serializer = BookOrderedSerializer(data=item)
            if not item_serializer.is_valid():
                errorlist.append(index)
        if errorlist.count != 0:
            return response.Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        order_object = orderSerializer.save()
        for item in books:
            item_object = Book.objects.get(id=item.get('id'))
            order_detail = OrderDetail(order=order_object, book=item_object, quantity=item.get('quantity'))
            order_detail.save()
        return response.Response(orderSerializer.data, status=status.HTTP_201_CREATED)

        # book + quantity
        # ship date
        # ship place
        # note 
        # is Paid
        # paid_at
        # {
        #   ship date: 
        #   ship place: 
        #   note :
        #   is Paid:
        #   paid_at:
        #   product: [
        #  {
        #   book = 1,
        #   quantity =1,
        # },
        #   {
        #       book = 5,
        #       quantity = 2
        #   }
        # ]


class RetrieveOrderView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, pk):
        # retrieve order data by id
        try:
            order = Order.objects.get(pk=pk)
            if order.user.pk != request.user.id or not request.user.is_staff:
                return response.Response(status=status.HTTP_403_FORBIDDEN)
            serializer = OrderDetailSerializer(order)
            return response.Response(serializer.data, status=status.HTTP_200_OK) 
        except Order.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def put(self, request, pk):
        # update order data by id 
        try: 
            order = Order.objects.get(pk=pk)
            if order.user.pk != request.user.id or not request.user.is_staff:
                return response.Response(status=status.HTTP_403_FORBIDDEN)
            serializer = OrderDetailSerializer(data=request.data, instance=order)
            if serializer.is_valid():
                serializer.save()
                return response.Response(serializer.data, status=status.HTTP_200_OK)
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        except Order.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def delete(self, request, pk):
        # delete 
        try: 
            order = Order.objects.get(pk=pk)
            if order.user.pk != request.user.id  or not request.user.is_staff:
                return response.Response(status=status.HTTP_403_FORBIDDEN)
            order.delete()
        except Order.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderView(views.APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self,request):
        # get all current order of user
        # TODO need to paginate
        try:
            order = Order.objects.all()
            serializer = OrderSerializer(data=order, many=True) 
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return response.Response(status=status.HTTP_404_NOT_FOUND)



