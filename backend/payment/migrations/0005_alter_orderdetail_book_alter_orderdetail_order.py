# Generated by Django 4.1.1 on 2022-11-30 17:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_book_description_alter_author_about'),
        ('payment', '0004_alter_order_is_delivered'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderdetail',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='book', to='product.book'),
        ),
        migrations.AlterField(
            model_name='orderdetail',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order', to='payment.order'),
        ),
    ]
