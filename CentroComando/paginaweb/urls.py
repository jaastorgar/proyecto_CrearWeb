from django.urls import path
from .views import home, solicitar_servicio

urlpatterns = [
    path('', home, name='inicio'),
    path('servicio/', solicitar_servicio, name='servicio'),
]