# Generated by Django 3.1.3 on 2020-12-20 14:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0002_auto_20201220_1423'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='demopost',
            name='author',
        ),
        migrations.RemoveField(
            model_name='demopost',
            name='categories',
        ),
        migrations.DeleteModel(
            name='Categories',
        ),
        migrations.DeleteModel(
            name='DemoPost',
        ),
    ]