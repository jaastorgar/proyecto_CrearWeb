from django.db import models


class SolicitudServicio(models.Model):
    TIPO_SERVICIO_CHOICES = [
        ('web', 'Página Web'),
        ('app', 'Aplicación Móvil'),
        ('ambos', 'Página Web y Aplicación Móvil'),
    ]

    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('en_proceso', 'En Proceso'),
        ('completado', 'Completado'),
        ('cancelado', 'Cancelado'),
    ]

    nombre = models.CharField(max_length=100)
    empresa = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    tipo_servicio = models.CharField(max_length=10, choices=TIPO_SERVICIO_CHOICES)
    descripcion = models.TextField()
    presupuesto_estimado = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fecha_solicitud = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')

    def __str__(self):
        return f"{self.nombre} - {self.empresa} - {self.get_tipo_servicio_display()}"

    class Meta:
        verbose_name = "Solicitud de Servicio"
        verbose_name_plural = "Solicitudes de Servicio"

class Message(models.Model):
    sender = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender}: {self.content[:50]}"
    


class PortfolioProject(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='portfolio_images/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

