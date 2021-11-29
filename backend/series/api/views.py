from rest_framework import generics, mixins, views
from rest_framework.response import Response
from series.models import Series, Season
from .serializers import seriesSerializer, seasonSerializer
import requests

class seriesAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    resource_name = 'series'
    serializer_class = seriesSerializer

    def get_queryset(self):
        queryset = Series.objects.all()
        title = self.request.query_params.get('filter[title]')
        if title  is not None:
            queryset = queryset.filter(title=title)
        return queryset
    
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

class addSeriesSearchListView(views.APIView):
    def get(self, request, search):
        try:
            response = requests.get('https://api.tvmaze.com/search/shows?q=' + search).json()
            return Response(response)
        except:
            return Response({'message': 'Server Error'})

class addSeriesCreateView(views.APIView):
    def post(self, request, series_id):
        try:
            series = requests.get('https://api.tvmaze.com/shows/' + str(series_id))
            series = series.json()
            try:
                Series.objects.get(title=series['name'])
                return Response({'message': 'Series already exists'})
            except Series.DoesNotExist:
                # series creating functionality
                newSeries = Series(title=series['name'], description=series['summary'])
                newSeries.save()
                seasons = requests.get('https://api.tvmaze.com/shows/' + str(series_id) + '/seasons').json()
                for season in seasons:
                    newSeason = Season(number=season['number'], title=season['name'], episodes=season['episodeOrder'], series=newSeries)
                    newSeason.save()
                    return Response({'message': 'Created series'})
        
        except:
            return Response({'message': 'Server Error'})
        
