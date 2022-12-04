from django.urls import path

from .views import (
    RatingView,
    RatingStatistic
)

urlpatterns = [
    path('books/<str:slug>/rating', RatingView.as_view(), name='ReviewProduct'),
    path('books/<str:slug>/rating-statistics', RatingStatistic.as_view(), name='RatingDetailView'),
]