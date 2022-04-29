from django.urls import path
import authentication.views as views

# from accounts.views import hello_world

urlpatterns = [
    ### Add urls in view.py here
    path('register/', views.register),
    path('login/', views.login),
    path('logout/', views.logout),
    
]