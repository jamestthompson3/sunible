from django.contrib import admin
from home.models import Zip, Installer, AveragePPW, HistoricInstalls
# Register your models here.
admin.site.register(Zip)
admin.site.register(Installer)
admin.site.register(AveragePPW)
admin.site.register(HistoricInstalls)