from rest_framework import generics, mixins
from series.models import Series, Season
from .serializers import seriesSerializer, seasonSerializer

class seriesAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    resource_name = 'series'
    serializer_class = seriesSerializer

    def get_queryset(self):
        return Series.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class seriesRudView(generics.RetrieveUpdateDestroyAPIView):
    resource_name = 'series'
    lookup_field = 'id'
    serializer_class = seriesSerializer

    def get_queryset(self):
        return Series.objects.all()

class seasonAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    resource_name = 'season'
    serializer_class = seasonSerializer

    def get_queryset(self):
        return Season.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class seasonRudView(generics.RetrieveUpdateDestroyAPIView):
    resource_name = 'season'
    lookup_field = 'id'
    serializer_class = seasonSerializer

    def get_queryset(self):
        return Season.objects.all()

