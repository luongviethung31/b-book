from django.urls import path
from .views import  (
    RegisterView,
    LoginView,
    UserDetailView,
    LogoutView,
    UserView
)

    
urlpatterns = [
    path("users/getAll", UserView.as_view(), name='get all user'),
    path("users/login/", LoginView.as_view(), name='login'),
    path("users/register/", RegisterView.as_view(),name='register'),
    path("users/info/", UserDetailView.as_view(), name="detail"),
    #path("users/logout/", LogoutView.as_view(), name="logout")
]