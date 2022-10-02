from django.contrib import admin

from .models import (
    Genre,
    Book,
    Author
)

class GenreAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title")}

class BookAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title")}

class AuthorAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name")}

admin.site.register(Genre)
admin.site.register(Book)
admin.site.register(Author)


