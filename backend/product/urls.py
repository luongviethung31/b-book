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
    path('genre/<str:slug>/', RetrieveUpdateDeleteGenreView.as_view(), name='RetrieveUpdateDeleteGenre'),
    path('genre/', ListCreateGenreView.as_view(), name='ListCreateGenre'),
    path('author/<str:slug>/', RetrieveUpdateDeleteAuthorView.as_view(), name='RetrieveUpdateDeleteAuthor'),
    path('author/', ListCreateAuthorView.as_view(), name='ListCreateAuthor'),
    path('book/<str:slug>/', RetrieveUpdateDeleteBookView.as_view(), name='RetrieveUpdateDeleteBook'),
    path('book/', ListCreateBookView.as_view(), name='ListCreateBook'),
]
 