from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import os
# Create your models here.
import datetime
def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    millisecond = now.microsecond//1000
    return f"users/{instance.pk}/{now:%Y%m%d%H%M%S}{millisecond}{extension}"

class User(AbstractUser):
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to=upload_to, blank=True )

    def __str__(self):
        return self.username


class Task(models.Model):
    user = models.ForeignKey(User,  on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    time1 = models.TimeField()
    time2 = models.TimeField()
    date = models.DateField()
    done = models.BooleanField(default=False)
    created_at = models.DateField(default= datetime.date.today)

    def __str__(self):
        return self.title






    
    