from django.urls import path
from .views import (
    CreateOrderView,
    RetrieveOrderView,
    OrderView,
    CurrentShoppingSession,
    UpdateShoppingSession
)

urlpatterns = [
    path('order', CreateOrderView.as_view(), name='GetCreateOrder'),
    path('order/<int:id>', RetrieveOrderView.as_view(), name='RetrieveUpdateOrderView'),
    path('all-order', OrderView.as_view(), name='GetAllOrder'),
    path('cart', CurrentShoppingSession.as_view(), name='CurrentShoppingSession'),
    path('cart/update', UpdateShoppingSession.as_view(), name='AddRemoveCartItem')
]
