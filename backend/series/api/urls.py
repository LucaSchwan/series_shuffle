from .views import seriesAPIView
from django.urls import path

urlpatterns = [
    path("", seriesAPIView.as_view(), name="series-create")
]
