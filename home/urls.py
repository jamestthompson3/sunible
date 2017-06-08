from django.conf.urls import url
from home import views
from django.views.generic.base import RedirectView

urlpatterns=[
	url(r'^$',views.index,name='home'),
	url(r'^geozipresponse/$',views.geozipresponse,name='geozipresponse'),
	url(r'^populateinstallerlist/$',views.populateInstallerList,name='populateinstallerlist'),
	url(r'^privacy/$',views.privacy,name='privacy'),
	url(r'^tos/$',views.tos,name='tos'),
	url(r'^blog/$',views.blog,name='blog'),
	url(r'^blog/solar-101',RedirectView.as_view(url="http://blog.sunible.com/solar-101/")),
	url(r'^blog/how-to-compare-solar-quotes',RedirectView.as_view(url="http://blog.sunible.com/how-to-compare-solar-quotes")),
	url(r'^blog/solar-tax-credit-itc',RedirectView.as_view(url="http://blog.sunible.com/solar-tax-credit-itc"))
	# url(r'^populate/$',views.populate,name='populate'),
]