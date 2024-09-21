from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name='home'),
    path('servicio/', views.solicitar_servicio, name='servicio'),
    path('portfolio/', views.portfolio, name='portfolio'),
 ]