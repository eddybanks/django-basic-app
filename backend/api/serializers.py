from rest_framework import serializers
from .models import Product, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    tags = TagSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'tags']
