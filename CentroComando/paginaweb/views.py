from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import SolicitudServicioForm, LoginForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
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

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('customer_service')
            else:
                form.add_error(None, "Usuario o contraseña incorrectos")
    else:
        form = LoginForm()
    return render(request, 'paginaweb/login.html', {'form': form})

@login_required
def customer_service_panel(request):
    return render(request, 'paginaweb/customer_service_panel.html')

def logout_view(request):
    logout(request)
    return redirect('home')