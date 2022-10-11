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
        extra_kwargs = {
            'slug': {'read_only': True}
        }    
    
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
            "created_date",
            "updated_date",
            "related_books",
            "same_author"
        )
        extra_kwargs = {
            "slug": {"read_only": True},
            "created_date": {"read_only": True},
            "updated_date": {"read_only": True},
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
        return BookSerializer(obj.books.all(), many=True).data

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
        return BookSerializer(obj.work.all(), many=True).data

