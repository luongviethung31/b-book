# Generated by Django 4.1.1 on 2022-10-11 16:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(unique=True)),
                ('born', models.DateField(blank=True)),
                ('died', models.DateField(blank=True)),
                ('nationality', models.CharField(blank=True, max_length=100)),
                ('portrait', models.URLField()),
                ('about', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(unique=True)),
                ('description', models.TextField()),
                ('created_date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, unique=True)),
                ('slug', models.SlugField(unique=True)),
                ('thumbnail', models.URLField()),
                ('count', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='work', to='product.author')),
                ('genre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='books', to='product.genre')),
            ],
        ),
    ]
