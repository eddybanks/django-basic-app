# django-basic-app

This is a very basic app to get started with a list of products organized by categories and tags.

P.S. The backend django rest framework API was entirely built without assistance from AI, while the frontend was built with AI assistence with about 60~70% agentic coding, especially for the CSS styling. I do understand every line of code and should be able to explain in detail.

## Thought process
This repo is made of:
  - a DRF backend/API that handles accessing product catalog data from a basic sqlite database, and
  - a Nextjs frontend web app.

The backend app has the following models which map to database tables: Product, Category and Tag.
In order to interact with data, the serializers, views and urls for the relevant models were generated.
I chose a many-to-many relationship between the Product and Tag, and a many-to-one relationship between the Product and Category.
Only one readonly viewset/endpoint is used for app i.e. the products endpoint. This is sufficient to provide the list of products, and associated categories and/or tags.

## Running the app

To get up and running with the app on your dev environment you'll need to run both the backend DRF api and the frontend react app.

- Backend:
```bash
# Start the virtual env
python -m venv env
source env/bin/activate
# CD into the backend directory and run the necessary migrations
cd backend
# Install dependencies
pip install -r requirements.txt
# Run migrations
python manage.py makemigrations
python manage.py migrate
# Start the backend server
python manage.py runserver
```

- Populate Data via Admin interface
  - Create a superuser to access the admin interface
    ```bash
    # Start the virtual env or skip if already in one
    python -m venv env
    source env/bin/activate
    # CD into backend and create superuser
    cd backend
    python manage.py createsuperuser
    ```
  - Follow the prompts to create the superuser
  - Access the admin interface at http://127.0.0.1:8000/admin
  - Login with the superuser credentials you just created
  - Add Categories, Tags and Products via the admin interface

_P.S. Alternatively, data could be populated using the shell `python manage.py shell` if you're familiar with the shell_

- Frontend
```bash
# CD into the frontend directory and install the dependencies
cd frontend
# you could also using pnpm, yarn or some other package manager to install dependences
npm install
# Start the frontend server
npm run dev
```

## Possible improvements
- Backend
  - I considered pytests but skipped out on it since this is supposed to be a quick test
  - For simplicity, I chose a singular file in each case for the models, serializers, urls, views, etc... instead of breaking them out or modularizing into individual files per model, serializer, etc.. or breaking into multiple apps.
  - I also chose to skip out on pagination for the product list endpoint or providing multiple Viewsets/URL endpoints for the models
  - `Django-filters` could be installed for better filtering instead of depending on a queryset method for filtering within the products viewset
- Frontend
  - Again, testing could help improve things
