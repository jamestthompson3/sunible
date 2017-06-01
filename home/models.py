from django.db import models

# Create your models here.
class Zip(models.Model):
	zipcode = models.CharField(max_length=5)
	lon = models.FloatField()
	lat = models.FloatField()

	def __str__(self):
		return self.name