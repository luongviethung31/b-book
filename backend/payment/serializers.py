from rest_framework import serializers

from .models import (
    Order, 
    OrderDetail,
    ShoppingSession,
    CartItem
)

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

    def to_representation(self, instance):
        context = super().to_representation(instance)
        context['user'] = {
            "id": instance.user.id,
            "username": instance.user.username,
            "email": instance.user.email,
        }
        return context

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
            "price": instance.book.price,
            "thumbnail": instance.book.thumbnail
        }
        return context
        
class ShoppingSessionSerializer(serializers.ModelSerializer):
    cart_item = serializers.SerializerMethodField('get_cart_item')
    class Meta:
        model = ShoppingSession
        fields = (
            "user",
            "total",
            "updated",
            "cart_item"
        )
        extra_kwargs = { 
            'created': {'read_only': True},
            'updated': {'read_only': True},
            'cart_item': {'read_only': True},
        }
    
    def get_cart_item(self, obj):
        return CartItemSerializer(obj.shopping_session.all(), many=True).data
    

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = "__all__"
        extra_kwargs = { 
            'created': {'read_only': True},
            'updated': {'read_only': True},
        }
    
    def to_representation(self, instance):
        context = super().to_representation(instance)
        context['book'] = {
            "id": instance.book.id,
            "title": instance.book.title,
            "slug": instance.book.slug,
            "price": instance.book.price,
            "thumbnail": instance.book.thumbnail
        }
        return context
