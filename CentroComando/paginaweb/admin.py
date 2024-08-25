from django.contrib import admin
from .models import SolicitudServicio

# Register your models here.
@admin.register(SolicitudServicio)
class SolicitudServicioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'empresa', 'tipo_servicio', 'fecha_solicitud', 'estado')
    list_filter = ('tipo_servicio', 'estado', 'fecha_solicitud')
    search_fields = ('nombre', 'empresa', 'email')
