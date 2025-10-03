from rest_framework import viewsets
from rest_framework import filters
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter] # Basic filtering for this example

    # 1. Search by 'description' (as requested) and 'name'
    search_fields = ['name', 'description']

    # 2. Filter by 'category' (by category name)
    def get_queryset(self):
        queryset = self.queryset
        # Check for a 'category' query parameter
        category_name = self.request.query_params.get('category')
        if category_name:
            # Filter by the category name
            queryset = queryset.filter(category__name__iexact=category_name)

        # Check for a 'tag' query parameter
        tag_name = self.request.query_params.get('tag')
        if tag_name:
            # Filter by the tag name
            queryset = queryset.filter(tags__name__iexact=tag_name)

        return queryset
