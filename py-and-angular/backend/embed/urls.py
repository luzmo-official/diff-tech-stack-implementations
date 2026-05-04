from django.urls import path

from . import views

urlpatterns = [
    path("embed", views.create_embed_token),
]
