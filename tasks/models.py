from django.db import models

# Create your models here.
# TODO: Creamos el modelo de datos para la tabla Task
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # TODO: En el panel de administrador que datos se deben mostrar
    def __str__(self):
        return self.title
