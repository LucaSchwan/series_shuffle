from rest_framework import generics, mixins
from series.models import Series
from .serializers import seriesSerializer

class seriesAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    resource_name = 'series'
    serializer_class = seriesSerializer

    def get_queryset(self):
        return Series.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    