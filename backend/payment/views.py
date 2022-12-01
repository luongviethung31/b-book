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

import sys


### ORDER ###

class CreateOrderView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request): 
        # get all order by user id
        try:
            order = Order.objects.filter(user__pk=request.user.pk)
            serializer = OrderSerializer(order, many=True) 
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        # create new order
        try:
            books = request.data.get('product')
            order = {
                "ship_date": request.data.get("ship_date"),
                "ship_place": request.data.get("ship_place"),
                "note": request.data.get("note"),
                "is_paid": request.data.get("is_paid"),
                "paid_at": request.data.get("paid_at"),
                "user": request.user.id
            }
            orderSerializer = OrderSerializer(data=order)
            if not orderSerializer.is_valid():
                return response.Response(orderSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
            errorlist = []
            for item in books:
                book_ordered = {
                    "book": item["book"],
                    "quantity": item["quantity"]
                }
                item_serializer = BookOrderedSerializer(data=book_ordered)
                if not item_serializer.is_valid():
                    errorlist.append(item_serializer.errors)
            if len(errorlist) != 0:
                return response.Response({"message": errorlist}, status=status.HTTP_400_BAD_REQUEST)
            order_object = orderSerializer.save()
            for item in books:
                item_object = Book.objects.get(id=item["book"])
                print(item_object.id)
                order_detail = OrderDetail(order=order_object, book=item_object, quantity=item.get('quantity'))
                order_detail.save()
            return response.Response(orderSerializer.data, status=status.HTTP_201_CREATED)
        except Book.DoesNotExist:
            return response.Response({"message": "Not found this book"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RetrieveOrderView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, id):
        # retrieve order data by id
        try:
            order = Order.objects.get(id=id)
            if order.user.pk != request.user.id and not request.user.is_staff:
                return response.Response(status=status.HTTP_403_FORBIDDEN)
            serializer = OrderSerializer(order)
            return response.Response(serializer.data, status=status.HTTP_200_OK) 
        except Order.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def put(self, request, id):
        # update order data by id 
        try: 
            return response.Response({"message": "this function is not available"},status=status.HTTP_501_NOT_IMPLEMENTED)
            order = Order.objects.get(pk=id)
            if order.user.pk != request.user.id and not request.user.is_staff:
                return response.Response(status=status.HTTP_403_FORBIDDEN)
            serializer = OrderSerializer(data=request.data, instance=order)
            if serializer.is_valid():
                serializer.save()
                return response.Response(serializer.data, status=status.HTTP_200_OK)
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        except Order.DoesNotExist:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def delete(self, request, id):
        # delete 
        try: 
            order = Order.objects.get(pk=id)
            if order.user.pk != request.user.id and not request.user.is_staff:
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
            print("here")
            order = Order.objects.all()
            serializer = OrderSerializer(order, many=True) 
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return response.Response(status=status.HTTP_404_NOT_FOUND)



