from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task


# Create your views here.
# TODO: Creamos la vista para la tabla Task
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
