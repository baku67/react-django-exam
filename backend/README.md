# Installation du projet Django DRF Backend

python -m venv .venv
pip install django djangorestframework django-cors-headers

python manage.py makemigrations
python manage.py migrate

python manage.py runserver