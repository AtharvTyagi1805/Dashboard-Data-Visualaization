from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import DataEntryViewSet

router = DefaultRouter()
router.register(r'data', DataEntryViewSet)  

urlpatterns = [
    path('', include(router.urls)),  
]
