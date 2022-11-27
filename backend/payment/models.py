from django.db import models
from user.models import User
from product.models import Book
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

class Order(models.Model):
    user = models.ForeignKey(User, related_name='owner', on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    ship_date = models.DateTimeField()
    ship_place = models.CharField(max_length=500)
    total = models.DecimalField(decimal_places=3, max_digits=10)
    note = models.CharField(blank=True, null=True, max_length=500)
    is_paid = models.BooleanField()
    is_delivered = models.BooleanField()
    paid_at = models.DateField()
    created = models.DateTimeField(auto_created=True, auto_now=True)

    def __str__(self) -> str:
        return "{user} : {id}".format(user=self.user, id=self.pk)

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, related_name='order', on_delete=models.PROTECT)
    book = models.ForeignKey(Book, related_name="book", on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    subtotal = models.DecimalField(decimal_places=3, max_digits=10)

    def __str__(self) -> str:
        return "{order} : {book}".format(order=self.order_id, book=self.book_id)

@receiver(pre_save, sender=OrderDetail)
def my_handler(sender, **kwargs):
    order_detail = kwargs['instance']
    book = Book.objects.get(id=order_detail.book.id)
    order_detail.subtotal = book.price * order_detail.quantity

@receiver(post_save , sender = OrderDetail)
def update_cart(sender , **kwargs):
    order_detail = kwargs['instance']
    order = Order.objects.get(user = order_detail.user)
    order.total += order_detail.subtotal
    order.save() 