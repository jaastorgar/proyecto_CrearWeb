from django import forms
from .models import SolicitudServicio

class SolicitudServicioForm(forms.ModelForm):
    class Meta:
        model = SolicitudServicio
        fields = ['nombre', 'empresa', 'email', 'telefono', 'tipo_servicio', 'descripcion']
        widgets = {
            'descripcion': forms.Textarea(attrs={'rows': 4}),
        }