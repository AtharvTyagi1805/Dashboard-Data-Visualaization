from django.db import models

class DataEntry(models.Model):
    end_year = models.IntegerField(null=True, blank=True)
    intensity = models.IntegerField(default=1)  # Ensure intensity has a default
    sector = models.CharField(max_length=255, null=True, blank=True)
    topic = models.CharField(max_length=255)
    insight = models.TextField()
    region = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    relevance = models.IntegerField(default=0)
    pestle = models.CharField(max_length=255, null=True, blank=True)
    source = models.CharField(max_length=255, null=True, blank=True)
    likelihood = models.IntegerField(default=0)


    def __str__(self):
        return f"{self.topic} - {self.country}"
