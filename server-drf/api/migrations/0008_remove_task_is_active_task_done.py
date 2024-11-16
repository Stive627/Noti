# Generated by Django 5.1 on 2024-09-28 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_task_is_active_alter_task_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='is_active',
        ),
        migrations.AddField(
            model_name='task',
            name='done',
            field=models.BooleanField(default=False),
        ),
    ]
