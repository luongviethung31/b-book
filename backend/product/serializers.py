from rest_framework import serializers

from .models import (
    Genre,
    Book,
    Author
)

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
    
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

class RetrieveBookSerializer(serializers.ModelSerializer):
    
    related_books = serializers.SerializerMethodField(method_name='get_the_same_genre')
    same_author = serializers.SerializerMethodField(method_name='get_the_same_author')

    class Meta:
        model = Book
        fields = (
            "id",
            "title",
            "author",
            "genre",
            "slug",
            "thumbnail",
            "price",
            "created_date",
            "updated_date",
            "related_books"
        )
    
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
    
    def get_books(self, obj):
        return BookSerializer(obj.books.all(), many=True).data

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"
    
class RetrieveAuthorSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField('get_books')

    class Meta:
        model = Genre
        fields = (
            "id",
            "name",
            "born",
            "died",
            "nationality",
            "books",
        )
    
    def get_books(self, obj):
        return BookSerializer(obj.work.all(), many=True).data

