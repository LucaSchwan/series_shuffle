from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

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

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
    
    
    
