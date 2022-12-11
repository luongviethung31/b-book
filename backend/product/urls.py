from django.urls import path, include

from .views import (
    ListCreateGenreView,
    RetrieveUpdateDeleteGenreView,
    ListCreateAuthorView,
    RetrieveUpdateDeleteAuthorView,
    ListCreateBookView,
    RetrieveUpdateDeleteBookView,
    SearchBookView,
    GetAllBookWithId,
    GetBooksWithGenre,
    GetBooksWithAuthor
)

urlpatterns = [
    path('genres/<str:slug>', RetrieveUpdateDeleteGenreView.as_view(), name='RetrieveUpdateDeleteGenre'),
    path('genres', ListCreateGenreView.as_view(), name='ListCreateGenre'),
    path('genres/<str:slug>/books', GetBooksWithGenre.as_view(), name='BookWithGenre'),
    path('authors/<str:slug>', RetrieveUpdateDeleteAuthorView.as_view(), name='RetrieveUpdateDeleteAuthor'),
    path('authors', ListCreateAuthorView.as_view(), name='ListCreateAuthor'),
    path('authors/<str:slug>/books', GetBooksWithAuthor.as_view(), name='BookWithAuthor'),
    path('books/<str:slug>', RetrieveUpdateDeleteBookView.as_view(), name='RetrieveUpdateDeleteBook'),
    path('books', ListCreateBookView.as_view(), name='ListCreateBook'),
    path('search', SearchBookView.as_view(), name='SearchBook'),
    path('all-book-id', GetAllBookWithId.as_view(), name="GetAllBookId"),
    path('', include('rating.urls')),
]
 