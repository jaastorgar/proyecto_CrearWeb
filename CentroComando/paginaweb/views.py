from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import SolicitudServicioForm
from .models import PortfolioProject

# Create your views here.
def home(request):
    return render(request, 'paginaweb/home.html')

def solicitar_servicio(request):
    if request.method == 'POST':
        form = SolicitudServicioForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.')
            return redirect('inicio')
    else:
        form = SolicitudServicioForm()
    return render(request, 'paginaweb/servicio.html', {'form': form})

def portfolio(request):
    projects = PortfolioProject.objects.all().order_by('-created_at')
    return render(request, 'paginaweb/portfolio.html', {'projects': projects})
