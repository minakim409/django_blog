# Generated by Django 4.0.4 on 2022-04-29 06:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BlogApp', '0005_comment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='text',
            new_name='content',
        ),
    ]
