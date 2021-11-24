from .views import seriesAPIView, seriesRudView, seasonAPIView, seasonRudView
from django.urls import path

urlpatterns = [
    path("series/", seriesAPIView.as_view(), name="series-create"),
    path("series/<int:id>", seriesRudView.as_view(), name="series-rud"),
    path("seasons/", seasonAPIView.as_view(), name="season-create"),
    path("seasons/<int:id>", seasonRudView.as_view(), name="season-rud")
]
