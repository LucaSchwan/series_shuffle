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
            seriesToCreate = requests.get('https://api.tvmaze.com/shows/' + str(series_id)).json()
            print(seriesToCreate)
            # seriesToCreate = series.json()
            try:
                Series.objects.get(title=seriesToCreate['name'])
                return Response({'message': 'Series already exists'})
            except Series.DoesNotExist:
                newSeries = Series(title=seriesToCreate['name'], description=seriesToCreate['summary'])
                newSeries.save()
                seasons = requests.get('https://api.tvmaze.com/shows/' + str(series_id) + '/seasons').json()
                for seasonToCreate in seasons:
                    print(season)
                    newSeason = Season(number=seasonToCreate['number'], title=seasonToCreate['name'], episodes=seasonToCreate['episodeOrder'], series=newSeries)
                    newSeason.save()
                return Response({'message': 'Created series'})
        
        except:
            return Response({'message': 'Server Error'})
        
