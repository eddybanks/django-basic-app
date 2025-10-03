# django-basic-app

This is a very basic app to get started with a list of products organized by categories and tags

## Stack
- Backend: Django rest framework (DRF)
- Frontend: React with Vite

## Running the app

To get up and running with the app on your dev environment you'll need to run both the backend DRF api and the frontend react app.

- Backend:
```bash
# CD into the backend directory and run the necessary migrations
cd
python manage.py makemigrations
python manage.py migrate
```

- Frontend
```bash
# CD into the frontend directory and install the dependencies
cd frontend
npm install # you could also using pnpm, yarn or some other package manager to install dependences
npm start
```
