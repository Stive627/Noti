from django.core.mail import send_mail, BadHeaderError
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import User

@receiver(post_save, sender = User)
def send_welcome_mail(sender, instance, created,  **kwargs,):
    if created:
        subject = 'Welcome mail'
        message='Welcome to the noti app. Your app for time management.'
        from_mail = instance.email
        send_mail(subject, message, from_mail, ['recoveryfwdc@gmail.com'])
