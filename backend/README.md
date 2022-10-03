# Django Rest API
## Prerequisites
- Python
- pip

## How to start running app as a developer ? 

Set up
```
$ git clone https://github.com/luongviethung31/b-book.git
$ cd backend   
$ python -m venv .env  # create virtual environment to install python package
$ source .env/Scripts/activate  # activate virtual environment
$ pip instal -r requirements.txt  # install requirement package
```

***Note:*** We can run command inside project to do some cron job
``` 
$ python manage.py crawler
```

Run app:
```
# You need to update database config in backend/config/settings.py
# After that, do make migrations
$ python manage.py makemigrations
$ python manage.py migrate
# Run your api
$ python manage.py runserver
```

Test branch