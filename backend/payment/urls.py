from django.urls import path
from .views import (
    CreateOrderView,
    RetrieveOrderView,
    OrderView
)

urlpatterns = [
    path('order', CreateOrderView.as_view(), name='GetCreateOrder'),
    path('order/<int:id>', RetrieveOrderView.as_view(), name='RetrieveUpdateOrderView'),
    path('all-order', OrderView.as_view(), name='GetAllOrder')
]
 