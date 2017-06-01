from django.db import models

# Create your models here.
class Zip(models.Model):
	zipcode = models.CharField(max_length=5)
	lon = models.FloatField(default=0)
	lat = models.FloatField(default=0)

	def __str__(self):
		return str(self.zipcode)
class Installer(models.Model):
	service_city = models.CharField(max_length=55)
	zipcode = models.CharField(max_length=5)
	service_county = models.CharField(max_length=35)
	dc_size = models.FloatField(default=0)
	ac_size = models.FloatField(default=0)
	installer = models.CharField(max_length=200)
	cost = models.FloatField(default=0)

	def __str__(self):
		return str(self.installer)