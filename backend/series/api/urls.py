from .views import seriesAPIView, seriesRudView, seasonAPIView, seasonRudView, addSeriesSearchListView, addSeriesCreateView
from rest_framework.authtoken import views
from django.urls import path

urlpatterns = [
    path('series/', seriesAPIView.as_view(), name='series-create'),
    path('series/<int:id>', seriesRudView.as_view(), name='series-rud'),
    path('seasons/', seasonAPIView.as_view(), name='season-create'),
    path('seasons/<int:id>', seasonRudView.as_view(), name='season-rud'),
    path('add-series/search/<str:search>', addSeriesSearchListView.as_view(), name='add-series-search'),
    path('add-series/create/<int:series_id>', addSeriesCreateView.as_view(), name='add-series-create'),
    path('login', views.obtain_auth_token)
]
