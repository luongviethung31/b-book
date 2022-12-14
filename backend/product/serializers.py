from rest_framework import serializers

from .models import (
    Genre,
    Book,
    Author
)
from rating.models import Rating
from django.db.models import Avg
import datetime

class BookSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField(method_name='get_average_rating')
    class Meta:
        model = Book
        fields = "__all__"
        extra_kwargs = {
            'slug': {'read_only': True},
            'average_rating': {'read_only': True},
        }    
    
    def get_average_rating(self, obj):
        return Rating.objects.filter(book=obj.id).aggregate(average_rating=Avg("rating"))

    def validate_release(self, value):
        if value > datetime.date.today().year:
            raise serializers.ValidationError("Release year can not greater than this year")
        return value

    def validate_discount(self, value):
        if value > 100:
            raise serializers.ValidationError("Discount can not greater than 100")
        if value < 0:
            raise serializers.ValidationError("Discount can not less than 0")
        return value

    def validate_count(self, value):
        if value < 0:
            raise serializers.ValidationError("Book quantity can not less than 0")
        return value

    def to_representation(self, instance):
        context = super().to_representation(instance)
        context['genre'] = {
            "id": instance.genre.id,
            "title": instance.genre.title
        }
        context['author'] = {
            "id": instance.author.id,
            "name": instance.author.name
        }
        return context

class RetrieveBookSerializer(serializers.ModelSerializer):
    
    related_books = serializers.SerializerMethodField(method_name='get_the_same_genre')
    same_author = serializers.SerializerMethodField(method_name='get_the_same_author')

    class Meta:
        model = Book
        fields = (
            "id",
            "title",
            'slug',
            "author",
            "genre",
            "thumbnail",
            "price",
            "count",
            "discount",
            "description",
            "release",
            "created_date",
            "updated_date",
            "related_books",
            "same_author"
        )
        extra_kwargs = {
            "slug": {"read_only": True},
            "created_date": {"read_only": True},
            "updated_date": {"read_only": True},
            "same_author": {"read_only": True},
            "related_books": {"read_only": True}
        }
    
    def to_representation(self, instance):
        context = super().to_representation(instance)
        context['genre'] = {
            "id": instance.genre.id,
            "title": instance.genre.title,
            "slug": instance.genre.slug
        }
        context['author'] = {
            "id": instance.author.id,
            "name": instance.author.name
        }
        return context
    
    def get_the_same_genre(self, obj):
        return BookSerializer(obj.same_genre, many=True).data
    
    def get_the_same_author(self, obj):
        return BookSerializer(obj.same_author, many=True).data

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"
        extra_kwargs = {
            'slug': {'read_only': True}
        }

class RetrieveGenreSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField('get_books')

    class Meta:
        model = Genre
        fields = (
            "id",
            "title",
            "slug",
            "description",
            "books",
            "created_date"
        )
        extra_kwargs = {
            'slug': {'read_only': True}
        }
    
    def get_books(self, obj):
        return BookSerializer(obj.books.all()[:10], many=True).data

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"
        extra_kwargs = {
            'slug': {'read_only': True}
        }
    
class RetrieveAuthorSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField('get_books')

    class Meta:
        model = Genre
        fields = (
            "id",
            "name",
            "slug",
            "born",
            "died",
            "nationality",
            "books",
        )
        extra_kwargs = {
            'slug': {'read_only': True}
        }
    
    def get_books(self, obj):
        return BookSerializer(obj.work.all()[:10], many=True).data
