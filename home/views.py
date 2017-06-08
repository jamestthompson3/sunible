from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from home.models import Zip, Installer,HistoricInstalls
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
def blog(request):
	return HttpResponseRedirect('http://blog.sunible.com')
# Create a view to populate zip-geo data DB
def populate(request):
	f = open('home/rez_counts_installer.csv','r')
	for line in f:
		line = line.split(',')
		create = Installer.objects.create()
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
	query = Installer.objects.filter(county=county)
	installer_list = []
	count_list = []
	total_installs = HistoricInstalls.objects.filter(county=county).aggregate(total_installs=Sum('count'))
	for item in query:
		installer_list.append((item.installer,item.count))
	# for item in query:
	# 	try:
	# 		query2 = Installer.objects.filter(service_county=county,installer=item.installer).count()
	# 		installer_query.append(query2)
	# 		installer_list.append(item.installer)
	# 		query3 = HistoricInstalls.objects.filter(county=county,installer=item.installer).aggregate(total_installs=Sum('count'))
	# 		historic_installs.append(query3)
	# 	except:
	# 		pass
	# data = serializers.serialize('json',query)
	data = json.dumps({"County":county,"Installer":installer_list,"Total_Installers":query.count(),"Total_Installs":total_installs})
	return HttpResponse(data,'json')
