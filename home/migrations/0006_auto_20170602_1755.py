# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-02 17:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_auto_20170601_2149'),
    ]

    operations = [
        migrations.AddField(
            model_name='zip',
            name='city',
            field=models.CharField(max_length=60, null=True),
        ),
        migrations.AddField(
            model_name='zip',
            name='county',
            field=models.CharField(max_length=35, null=True),
        ),
    ]