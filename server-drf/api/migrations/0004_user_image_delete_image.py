# Generated by Django 5.1 on 2024-09-16 17:21

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_image_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, upload_to=api.models.upload_to),
        ),
        migrations.DeleteModel(
            name='Image',
        ),
    ]