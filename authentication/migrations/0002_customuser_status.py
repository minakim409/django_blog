# Generated by Django 4.0.4 on 2022-04-27 20:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
