from django.contrib import admin
from home.models import Zip, Installer, HistoricInstalls
# Register your models here.
admin.site.register(Zip)
admin.site.register(Installer)
admin.site.register(HistoricInstalls)