from django.urls import path, include
from rest_framework import routers
from tasks import views
from rest_framework.documentation import include_docs_urls


router = routers.DefaultRouter()
router.register('tasks', views.TaskViewSet, basename='tasks')

# TODO: api/v1 generalmente se usa para el versionado de la API
urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='Django-React CRUD API')),
]
