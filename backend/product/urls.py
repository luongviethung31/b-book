from django.urls import path

from .views import (
    ListCreateGenreView,
    RetrieveUpdateDeleteGenreView,
    ListCreateAuthorView,
    RetrieveUpdateDeleteAuthorView,
    ListCreateBookView,
    RetrieveUpdateDeleteBookView,
)

urlpatterns = [
    path('genres/<str:slug>/', RetrieveUpdateDeleteGenreView.as_view(), name='RetrieveUpdateDeleteGenre'),
    path('genres/', ListCreateGenreView.as_view(), name='ListCreateGenre'),
    path('authors/<str:slug>/', RetrieveUpdateDeleteAuthorView.as_view(), name='RetrieveUpdateDeleteAuthor'),
    path('authors/', ListCreateAuthorView.as_view(), name='ListCreateAuthor'),
    path('books/<str:slug>/', RetrieveUpdateDeleteBookView.as_view(), name='RetrieveUpdateDeleteBook'),
    path('books/', ListCreateBookView.as_view(), name='ListCreateBook'),
]
 