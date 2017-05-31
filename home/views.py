from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers

# Create your views here.
def index(request):
	return render(request, "index.html")