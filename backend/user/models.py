from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, UserManager


class User(AbstractUser):
    first_name = models.CharField(verbose_name="First Name", max_length=100)
    last_name = models.CharField(verbose_name="Last Name", max_length=100)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    created = models.DateTimeField(auto_created=True, auto_now=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

    def __str__(self):
        return self.username