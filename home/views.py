from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from home.models import Zip, Installer

# Create your views here.
def index(request):
	return render(request, "index.html")
# Create a view to populate zip-geo data DB
def populate(request):
	f = open('home/installer_db_pop.csv','r')
	for line in f:
		line = line.split(',')
		create = Installer.objects.create()
		create.service_city = line[1].strip('\n')
		create.zipcode = line[2].strip('\n')
		create.service_county = line[3].strip('\n')
		create.dc_size = line[4].strip('\n')
		create.ac_size = line[5].strip('\n')
		create.installer = line[6].strip('\n')
		create.cost = line[7].strip('\n')
		create.save()
	f.close()
#API Responses
def geozipresponse(request):
	zip_code = request.GET["zip_code"]
	query = Zip.objects.filter(zipcode=zip_code)
	data = serializers.serialize('json',query)
	return HttpResponse(data,'json')