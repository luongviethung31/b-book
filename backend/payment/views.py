from rest_framework import (
    generics,
    permissions,
    views,
    response,
    status
)

from .models import (
    OrderDetail,
    Order,
    ShoppingSession,
    CartItem
)

from product.models import Book

from .serializers import (
    OrderSerializer,
    OrderDetailSerializer,
    BookOrderedSerializer,
    ShoppingSessionSerializer,
    CartItemSerializer
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
            except Exception as e:
                return response.Response({
                    "message": e
                }, status=status.HTTP_400_BAD_REQUEST)
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
        except Exception as e:
            print(e)
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
            """
            Hiện tại, theo các trang TMĐT hiện tại, tính năng cập nhật đơn hàng đều k được triển khai
            người dùng muốn tạo đơn hàng mới thì xóa và tạo lại.
            """
            #return response.Response({"message": "this function is not available"},status=status.HTTP_501_NOT_IMPLEMENTED)
            order = Order.objects.get(pk=id)
            if order.user.pk != request.user.id and not request.user.is_staff:
                return response.Response(status=status.HTTP_403_FORBIDDEN)
            request.data["user"] = request.user.id
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
        try:
            order = Order.objects.all()
            serializer = OrderSerializer(order, many=True) 
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

class CurrentShoppingSession(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        # Get or create current shopping session
        shopping_session, created = ShoppingSession.objects.get_or_create(user=request.user)
        serializer = ShoppingSessionSerializer(shopping_session)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        # Clear shopping session
        shopping_session, created = ShoppingSession.objects.get_or_create(user=request.user)
        cart_items = CartItem.objects.filter(shopping_session=shopping_session)
        for item in cart_items:
            item.delete()
        shopping_session.total = 0 
        shopping_session.save()
        serializer = ShoppingSessionSerializer(shopping_session)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

class UpdateShoppingSession(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        # Add Cart item
        shopping_session, created = ShoppingSession.objects.get_or_create(user=request.user)
        try:
            book = Book.objects.get(pk=request.data['book'])
            quantity = int(request.data['quantity'])
        except Exception as e:
            print(e)
            return response.Response({
                "message": "Request data is not valid"
            },status=status.HTTP_400_BAD_REQUEST)
        if book.count <= 0 or book.count - quantity < 0:
            print("Not enough book")
            return response.Response({
                "message": "The number of books remaining is not enough"
            }, status=status.HTTP_400_BAD_REQUEST)
        existing_cart_item = CartItem.objects.filter(book=book.id, shopping_session=shopping_session).first()
        if existing_cart_item:
            existing_cart_item.quantity += quantity
            existing_cart_item.save()
            shopping_session.total += existing_cart_item.book.price * quantity
        else:
            new_cart_item = CartItem(book=book, shopping_session=shopping_session, quantity=quantity)
            new_cart_item.save()
            shopping_session.total += new_cart_item.book.price * quantity
        
        shopping_session.save()
        serializer = ShoppingSessionSerializer(shopping_session)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        # Remove Cart item
        shopping_session, created = ShoppingSession.objects.get_or_create(user=request.user)
        try:
            book = Book.objects.get(pk=request.data['book'])
            quantity = int(request.data['quantity'])
        except Exception as e:
            print(e)
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        
        try:
            existing_cart_item = CartItem.objects.get(book=book.id, shopping_session=shopping_session)
        except Exception as e:
            print(e)
            return response.Response({
                "message": "This book is not exist in your cart"
            },status=status.HTTP_400_BAD_REQUEST)
        if existing_cart_item.quantity == 1 or existing_cart_item.quantity <= quantity:
            existing_cart_item.delete()
            shopping_session.total -= existing_cart_item.book.price * existing_cart_item.quantity
            if shopping_session.total < 0:
                shopping_session.total = 0
        else:
            existing_cart_item.quantity -= quantity
            existing_cart_item.save()
            shopping_session.total -= existing_cart_item.book.price * quantity
            if shopping_session.total < 0:
                shopping_session.total = 0

        shopping_session.save()
        serializer = ShoppingSessionSerializer(shopping_session)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
        