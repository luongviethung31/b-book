# Generated by Django 4.1.1 on 2022-11-28 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0002_alter_order_paid_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='total',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=10),
        ),
    ]
