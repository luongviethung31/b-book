from django.urls import path

from .views import (
    RatingView
)

urlpatterns = [
    path('books/<str:slug>/rating', RatingView.as_view(), name='ReviewProduct'),
]