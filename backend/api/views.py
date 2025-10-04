from rest_framework import viewsets
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer

# Could use rest_framework filters or django-filters for better filtering
# but decided to try a straightforward approach for now since I ran into some issues
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = self.queryset

        # Handle search functionality - search by name and description
        search_query = self.request.query_params.get("search")
        if search_query:
            # Search in both name and description fields
            queryset = queryset.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            )

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
