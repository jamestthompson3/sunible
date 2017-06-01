from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from home.models import Zip

# Create your views here.
def index(request):
	return render(request, "index.html")
# Create a view to populate zip-geo data DB
def populate(request):
	f = open('home/zipgeo.csv','r')
	for line in f:
		line = line.split(',')
		create = Zip.objects.create()
		create.zipcode = line[0]
		create.lat = line[1]
		create.lon = line[2].strip('\r\n')
		create.save()
	f.close()
#API Responses
def geozipresponse(request):
	zip_code = request.GET["zip_code"]
	query = Zip.objects.filter(zipcode=zip_code)
	data = serializers.serialize('json',query)
	return HttpResponse(data,'json')