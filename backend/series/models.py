from django.db import models

class Series(models.Model):
    title = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "series"

class Season(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length=30)
    episodes = models.IntegerField()
    series = models.ForeignKey(Series, related_name='seasons', on_delete=models.CASCADE)

    class Meta:
        unique_together = ['series', 'number']
        ordering = ['number']

    
    
    