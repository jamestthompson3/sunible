from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from home.models import Zip, Installer, AveragePPW

# Create your views here.
def index(request):
	return render(request, "index.html")
# Create a view to populate zip-geo data DB
def populate(request):
	f = open('home/EstimatedAvgPPW.csv','r')
	for line in f:
		line = line.split(',')
		create = AveragePPW.objects.create()
		create.installer = line[0]
		create.avg_cost = line[4].strip('\n')
		create.save()
	f.close()
#API Responses
def geozipresponse(request):
	zip_code = request.GET["zip_code"]
	query = Zip.objects.filter(zipcode=zip_code)
	data = serializers.serialize('json',query)
	return HttpResponse(data,'json')

def populateInstallerList(request):
	zip_code = request.GET["zip_code"]
	query = Zip.objects.filter(zipcode=zip_code)
	print(query[0].city)
	query = Installer.objects.filter(service_county=query[0].county).distinct('installer')
	data = serializers.serialize('json',query)
	return HttpResponse(data,'json')

def installerAvgCost(request):
	installer = request.GET["installer"]
	query = AveragePPW.objects.filter(installer=installer)
	data = serializers.serialize('json',query)
	return HttpResponse(data,'json')