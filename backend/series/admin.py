from django.contrib import admin
from django.db.models import fields
from .models import Season, Series 

class SeasonsInline(admin.TabularInline):
    model = Season
    extra = 1

class SeriesAdmin(admin.ModelAdmin):
    inlines = [SeasonsInline]
    list_display = ['title', 'created_at']
    search_fields = ['title']

class SeasonAdmin(admin.ModelAdmin):
    list_display = ['series', 'number']

        

admin.site.register(Series, SeriesAdmin)
admin.site.register(Season, SeasonAdmin)