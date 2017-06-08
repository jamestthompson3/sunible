from django.db import models

# Create your models here.
class Zip(models.Model):
	zipcode = models.CharField(max_length=5)
	lon = models.FloatField(default=1)
	lat = models.FloatField(default=1)
	city = models.CharField(max_length=60,null=True)
	county = models.CharField(max_length=35,null=True)

	def __str__(self):
		return str(self.zipcode)

class Installer(models.Model):
	county = models.CharField(max_length=35)
	installer = models.CharField(max_length=200)
	count = models.IntegerField(default=0)

	def __str__(self):
		return str(self.installer)

class HistoricInstalls(models.Model):
	installer = models.CharField(max_length=200)
	county = models.CharField(max_length=35)
	count = models.IntegerField(default=0)