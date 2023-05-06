from rest_framework import serializers
from series.models import Season, Series

class seasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = [
            'number',
            'title',
            'episodes',
            'series'
        ]

class seriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = [
            'id',
            'title',
            'created_at',
            'description',
            'seasons'
        ]
