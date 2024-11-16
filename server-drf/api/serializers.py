from rest_framework import serializers
from .models import User, Task


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs ={'password':{'write_only':True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password':{'write_only':True}}




class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'time1', 'time2','done', 'date', 'created_at']

    def create(self, validated_data):
        return super().create(validated_data)
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
    


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['image']
    def valid(self, *args,  **kwargs):
        if self.instance.image:
            self.instance.image.delete()
        return super().save(*args, **kwargs) 



class ProfileSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True, source = 'task_set')
    class Meta:
        model = User
        fields = ['username', 'email', 'image', 'tasks']


class DoneSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ['done']
    def update(self, instance, validated_data):
        instance.done = validated_data.get('done', instance.done)
        instance.save()
        return instance
    
