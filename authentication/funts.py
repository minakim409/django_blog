from .models import CustomUser
from rest_framework import status
from rest_framework.response import Response

def login_status(id):
    user = CustomUser.objects.get(id = id)
    if user == None:
        message = {"status": "User does not exist"}
        return Response(data = message, status = status.HTTP_400_BAD_REQUEST)

    if user.status == True:
        return True

    else:
        return False


    