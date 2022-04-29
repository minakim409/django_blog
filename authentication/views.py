from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import CustomUser
from .serializers import UserSerializer

# from django.contrib.auth import authenticate, login
# from django.contrib.auth import logout

from django.shortcuts import redirect

from .funts import login_status


# Create your views here.
@api_view(['POST'])
def register(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        userSerializer = UserSerializer(data = request.data)
        if userSerializer.is_valid(): #validation of string length, datatype, etc.
            userSerializer.save()
            return Response(status=status.HTTP_201_CREATED)

        else:
            return Response(data = userSerializer.errors, status = status.HTTP_400_BAD_REQUEST)


#https://docs.djangoproject.com/en/4.0/topics/auth/default/
@api_view(['POST'])
def login(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']
        print(username, password)
        user = CustomUser.objects.get(username = username)
        if user == None: #user not existing
            message = {"status": "User does not exist"}
            return Response(data = message, status = status.HTTP_400_BAD_REQUEST)
            
        else:
            if user.password != password: #incorrect password
                message = {"status": "Incorrect password"}
                return Response(data = message, status= status.HTTP_401_UNAUTHORIZED)
            else: #validated
                user.status = True
                user.save(update_fields=['status'])
                login_status(user.id)
                return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def logout(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        username = request.data['username']
        user = CustomUser.objects.get(username = username)
        if login_status(user.id) == True:
            user = CustomUser.objects.get(username = username)
            user.status = False
            user.save(update_fields=['status'])
            return Response(status=status.HTTP_200_OK)
        
            

    


