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
def privacy(request):
	return render(request,"pp.html")
def tos(request):
	return render(request,'tos.html')
# Create a view to populate zip-geo data DB
def populate(request):
	f = open('home/installer_db_pop.csv','r')
	for line in f:
		line = line.split(',')
		create = Installer.objects.create()
		create.service_county = line[3]
		create.service_city = line[1]
		create.dc_size = line[4]
		create.ac_size = line[5]
		create.zipcode = line[2]
		create.installer = line[6]
		create.cost = line[7].strip('\n')
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
	total_installs = HistoricInstalls.objects.filter(county=county).aggregate(total_installs=Sum('count'))
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
	data = json.dumps({"County":county,"Installer":result_list,"Total_Installers":query.count(),"Total_Installs":total_installs})
	return HttpResponse(data,'json')
