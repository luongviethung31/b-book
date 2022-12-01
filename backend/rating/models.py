from django.db import models
from django.utils.text import slugify
from product.models import Book
from user.models import User

class Rating(models.Model):
    book = models.ForeignKey(Book, related_name='books', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['book']
    
    def __str__(self) -> str:
        return "{book} : {user}".format(book=self.book, user=self.user)
