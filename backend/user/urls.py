from django.urls import path
from .views import  (
    RegisterView,
    LoginView,
    UserDetailView,
    LogoutView,
    UserView
)


    
urlpatterns = [
    path("getAll", UserView.as_view(), name='get all user'),
    path("login", LoginView.as_view(), name='login'),
    path("register", RegisterView.as_view(),name='register'),
    path("info", UserDetailView.as_view(), name="detail"),
    path("logout", LogoutView.as_view(), name="logout")
]