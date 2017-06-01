from django.db import models

# Create your models here.
class Zip(models.Model):
	zipcode = models.CharField(max_length=5)
	lon = models.FloatField(default=0)
	lat = models.FloatField(default=0)

	def __str__(self):
		return str(self.zipcode)