# Installation du projet Frontend

npm install
npm run dev


# Installation du projet Django DRF Backend

python -m venv .venv
.venv\Scripts\activate (windows)

python -m pip install django djangorestframework django-cors-headers
-OU plutot:
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver