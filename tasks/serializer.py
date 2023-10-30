# TODO: Aqui se define que datos de la tabla Task se van a procesar en la API

from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = ('id', 'title', 'description', 'completed', 'created_at')
        fields = '__all__'
