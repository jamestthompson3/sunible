from django.conf.urls import url
from home import views
from django.views.generic.base import RedirectView

urlpatterns=[
	url(r'^$',views.index,name='home'),
	url(r'^geozipresponse/$',views.geozipresponse,name='geozipresponse'),
	url(r'^populateinstallerlist/$',views.populateInstallerList,name='populateinstallerlist'),
	url(r'^privacy/$',views.privacy,name='privacy'),
	url(r'^tos/$',views.tos,name='tos'),
	url(r'^blog',views.blog,name='blog')
	# url(r'^populate/$',views.populate,name='populate'),
]