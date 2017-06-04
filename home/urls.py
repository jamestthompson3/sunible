from django.conf.urls import url
from home import views

urlpatterns=[
	url(r'^$',views.index,name='home'),
	url(r'^geozipresponse/$',views.geozipresponse,name='geozipresponse'),
	url(r'^populateinstallerlist/$',views.populateInstallerList,name='populateinstallerlist'),
	url(r'^installavgcost/$',views.installerAvgCost,name='installavgcost'),
	# url(r'^populate/$',views.populate,name='populate'),
]