from rest_framework import serializers

from .models import (
    Order, 
    OrderDetail
)

from product.serializers import BookSerializer

class OrderSerializer(serializers.ModelSerializer):
    order_detail = serializers.SerializerMethodField('get_order_detail')
    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "ship_date",
            "ship_place",
            "note",
            "is_paid",
            "paid_at",
            "total",
            "order_detail",
        )
        extra_kwargs = {
            'total': {'read_only':True},
            'is_delivered': {'read_only':True},
            'order_detail': {'read_only':True}
        }  

    def get_order_detail(self, obj):
        return OrderDetailSerializer(obj.order.all(), many=True).data

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
    def to_representation(self, instance):
        context = super().to_representation(instance)
        context['book'] = {
            "id": instance.book.id,
            "title": instance.book.title,
            "slug": instance.book.slug,
            "price": instance.book.price
        }
        return context