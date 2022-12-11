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
    total = models.DecimalField(decimal_places=3, max_digits=10, default=0)
    note = models.CharField(blank=True, null=True, max_length=500)
    is_paid = models.BooleanField()
    is_delivered = models.BooleanField(default=False)
    paid_at = models.CharField(max_length=100)
    created = models.DateTimeField(auto_created=True, auto_now=True)

    def __str__(self) -> str:
        return "{user} : {id}".format(user=self.user, id=self.pk)

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, related_name='order', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name="book", on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    subtotal = models.DecimalField(decimal_places=3, max_digits=10)

    def __str__(self) -> str:
        return "{order} : {book}".format(order=self.order_id, book=self.book_title)

class ShoppingSession(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    total = models.DecimalField(decimal_places=3, max_digits=10, default=0)
    created = models.DateTimeField(auto_created=True, auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return "{user} : cart {id} ".format(user=self.user.username, id=self.pk)
    

class CartItem(models.Model):
    shopping_session = models.ForeignKey(ShoppingSession, related_name='shopping_session', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name="product", on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    created = models.DateTimeField(auto_created=True, auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return "{session} : {book} ".format(session=self.shopping_session, book=self.book.id)


@receiver(pre_save, sender=OrderDetail)
def my_handler(sender, **kwargs):
    order_detail = kwargs['instance']
    book = Book.objects.get(id=order_detail.book.id)
    order_detail.subtotal = book.price * order_detail.quantity * (book.discount/100)

@receiver(post_save , sender = OrderDetail)
def update_order(sender , **kwargs):
    order_detail = kwargs['instance']
    order = Order.objects.get(pk=order_detail.order.id)
    order.total += order_detail.subtotal
    order.save() 