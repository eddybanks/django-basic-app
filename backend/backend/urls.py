from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ProductViewSet

router = DefaultRouter()
# Route for the products endpoint - handled by the readonly product viewset
router.register(r'products', ProductViewSet, basename='product')

# Admin route provided for admin level data management
# Also api/ root route for api endpoints - only products in this case
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
