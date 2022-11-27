from django.urls import path
from .views import (
    CreateOrderView,
    RetrieveOrderView
)

urlpatterns = [
    path('order', CreateOrderView.as_view(), name='GetCreateOrder'),
    path('order/<int:pk>', RetrieveOrderView.as_view(), name='RetrieveUpdateOrderView')
]
 