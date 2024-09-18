from django.urls import path
from .views import home, solicitar_servicio, customer_service_panel, login_view, logout_view
from . import views
urlpatterns = [
    path('', views.home, name='home'),
    # path('', home, name='inicio'),
    path('servicio/', solicitar_servicio, name='servicio'),
    path('customer_service/', customer_service_panel, name='customer_service'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('portfolio/', views.portfolio, name='portfolio'),
    
 ]