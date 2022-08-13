from .models import CustomUser
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username', 'realname', 'password']

    # def to_representation(self, instance):
    #     return {
    #         "id": instance.id,
    #         "username": instance.username
    #     }
