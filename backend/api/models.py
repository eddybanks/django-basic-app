from django.db import models

# I chose the following models and relationships
# Category - belongs to a product
# Product - belongs to a category, has many tags
# Tag - can belong to many products
# Optionally - the product->category relationship could be a many-to-many relationship as well,
# I just chose a many-to-one for simplicity
class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    tags = models.ManyToManyField('Tag', blank=True, related_name='products')

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
