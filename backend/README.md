cd backend
python -m venv .env
source .env/Scripts/activate
pip instal -r requirements.txt

crawler: python manage.py crawler