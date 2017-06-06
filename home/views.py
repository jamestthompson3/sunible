from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from home.models import Zip, Installer, AveragePPW, HistoricInstalls
from itertools import chain
from operator import attrgetter
import json
from django.db.models import F, Sum, Count

# Create your views here.
def index(request):
	return render(request, "index.html")
# Create a view to populate zip-geo data DB
def populate(request):
	f = open('home/rez_counts.csv','r')
	for line in f:
		line = line.split(',')
		create = HistoricInstalls.objects.create()
		create.county = line[0]
		create.installer = line[1]
		create.count = line[2].strip('\n')
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
	county = query[0].county
	query = Installer.objects.filter(service_county=county).distinct('installer')
	installer_list = []
	installer_query = []
	historic_installs = []
	for item in query:
		try:
			query2 = Installer.objects.filter(service_county=county,installer=item.installer).count()
			installer_query.append(query2)
			installer_list.append(item.installer)
			query3 = HistoricInstalls.objects.filter(county=county,installer=item.installer).aggregate(total_installs=Sum('count'))
			historic_installs.append(query3)
		except:
			pass
	result_list = list(zip(installer_list,installer_query,historic_installs))
	# data = serializers.serialize('json',query)
	data = json.dumps({"County":county,"Installer":result_list})
	return HttpResponse(data,'json')
