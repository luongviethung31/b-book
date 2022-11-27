from rest_framework import serializers

from .models import (
    Order, 
    OrderDetail
)

from product.serializers import BookSerializer

class OrderSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField(method_name='get_books')
    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "ship_date",
            "ship_place",
            "note",
            "is_paid",
            "paid_at"
        )
        extra_kwargs = {
            'order_date': {'read_only': True},
            'total': {'read_only':True},
            'is_paid': {'read_only':True},
            'is_delivered': {'read_only':True},
            'books': {'read_only':True}
        }  

        def get_books(self, obj):
            return BookSerializer(obj.books.all(), many=True).data

class BookOrderedSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = (
            'book',
            'quantity'
        )

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = "__all__"
        extra_kwargs = { 
            'subtotal': {'read_only': True},
        }