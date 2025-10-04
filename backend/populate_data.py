# First, start the Django shell
# cd backend
# python manage.py shell

# Import your models
from api.models import Category, Tag, Product
import random

# Create 5 construction categories
categories = [
    "Heavy Equipment",
    "Hand Tools",
    "Safety Equipment",
    "Building Materials",
    "Electrical Tools"
]

category_objects = []
for cat_name in categories:
    category, created = Category.objects.get_or_create(name=cat_name)
    category_objects.append(category)
    print(f"{'Created' if created else 'Found existing'} category: {category.name}")

# Create 10 construction tags
tags = [
    "Professional Grade",
    "Durable",
    "Cordless",
    "Heavy Duty",
    "Weather Resistant",
    "High Performance",
    "Commercial Use",
    "Precision",
    "Multi-Purpose",
    "Energy Efficient"
]

tag_objects = []
for tag_name in tags:
    tag, created = Tag.objects.get_or_create(name=tag_name)
    tag_objects.append(tag)
    print(f"{'Created' if created else 'Found existing'} tag: {tag.name}")

# Create 20 construction products
products_data = [
    {"name": "Excavator CAT 320", "description": "Heavy duty excavator for large construction projects", "category": "Heavy Equipment"},
    {"name": "Cordless Drill Set", "description": "Professional 18V cordless drill with multiple bits", "category": "Hand Tools"},
    {"name": "Hard Hat with LED", "description": "ANSI approved safety helmet with integrated LED light", "category": "Safety Equipment"},
    {"name": "Steel Rebar Bundle", "description": "Grade 60 steel reinforcement bars, 20ft length", "category": "Building Materials"},
    {"name": "Wire Stripping Tool", "description": "Precision wire stripping and crimping tool", "category": "Electrical Tools"},
    {"name": "Bulldozer D6T", "description": "Medium dozer for earthmoving and grading", "category": "Heavy Equipment"},
    {"name": "Hammer Drill", "description": "SDS-Plus rotary hammer drill for concrete work", "category": "Hand Tools"},
    {"name": "Safety Harness Kit", "description": "Full body harness with lanyard and anchor points", "category": "Safety Equipment"},
    {"name": "Concrete Mix Bags", "description": "Fast-setting concrete mix, 80lb bags", "category": "Building Materials"},
    {"name": "Multimeter Digital", "description": "Professional grade digital multimeter", "category": "Electrical Tools"},
    {"name": "Crane Mobile 25T", "description": "Mobile crane with 25-ton lifting capacity", "category": "Heavy Equipment"},
    {"name": "Circular Saw", "description": "7.25 inch circular saw with carbide blade", "category": "Hand Tools"},
    {"name": "Safety Vest Hi-Vis", "description": "Class 2 high visibility safety vest with reflective tape", "category": "Safety Equipment"},
    {"name": "Plywood Sheets", "description": "3/4 inch construction grade plywood sheets", "category": "Building Materials"},
    {"name": "Cable Tester", "description": "Network and coax cable testing device", "category": "Electrical Tools"},
    {"name": "Skid Steer Loader", "description": "Compact loader for tight space operations", "category": "Heavy Equipment"},
    {"name": "Impact Wrench", "description": "1/2 inch pneumatic impact wrench", "category": "Hand Tools"},
    {"name": "Safety Goggles", "description": "Anti-fog safety goggles with UV protection", "category": "Safety Equipment"},
    {"name": "Insulation Rolls", "description": "R-15 fiberglass insulation rolls", "category": "Building Materials"},
    {"name": "Voltage Tester", "description": "Non-contact voltage detector with LED indicators", "category": "Electrical Tools"}
]

# Create products and assign random tags
created_products = 0
for product_data in products_data:
    # Check if product already exists
    if Product.objects.filter(name=product_data["name"]).exists():
        print(f"Product '{product_data['name']}' already exists, skipping...")
        continue

    # Find the category object
    category = Category.objects.get(name=product_data["category"])

    # Create the product
    product = Product.objects.create(
        name=product_data["name"],
        description=product_data["description"],
        category=category
    )

    # Assign 2-4 random tags to each product
    num_tags = random.randint(2, 4)
    random_tags = random.sample(tag_objects, num_tags)
    product.tags.set(random_tags)

    created_products += 1
    print(f"Created product: {product.name} with {len(random_tags)} tags")

print(f"\nSummary:")
print(f"Total categories in database: {Category.objects.count()}")
print(f"Total tags in database: {Tag.objects.count()}")
print(f"Total products in database: {Product.objects.count()}")
print(f"Products created in this run: {created_products}")
