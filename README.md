# series_shuffle

This is the second rewrite of [random-episode-finder](https://github.com/LucaSchwan/random-episode-finder).  
I wrote this as part of an one week internship at the company my cousin works at.  
It uses [Django](https://www.djangoproject.com/) using sqlite as the backend and [Ember.js](https://emberjs.com/) as the frontend, as this was the technology they were using there at the time. It is also using [tailwindcss](https://tailwindcss.com/), but that was my own choice.

<br />

To use it you should have python, django and npm installed.  
Start the backend server with

``` bash
cd backend
python manage.py runserver
```

It should start the backend on port `9000`.

Then you need to first install the frontend using

``` bash
cd frontend
npm install
```

And then start the frontend

``` bash
(cd frontend)
npm start
```