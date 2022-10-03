from django.db import models

class Genre(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title']
    
    def __str__(self) -> str:
        return self.title

class Author(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    born = models.DateField(blank=True)
    died = models.DateField(blank=True)
    nationality = models.CharField(max_length=100, blank=True)

    def __str__(self) -> str:
        return self.name

class Book(models.Model):
    genre = models.ForeignKey(Genre, related_name='books', on_delete=models.CASCADE)
    author = models.ForeignKey(Author, related_name='work', on_delete=models.CASCADE, blank=True) 
    title = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(unique=True)
    thumbnail = models.URLField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

    @property
    def same_genre(self):
        return self.genre.books.all().exclude(id=self.id)

    @property
    def same_author(self):
        return self.author.work.all().exclude(id=self.id)
