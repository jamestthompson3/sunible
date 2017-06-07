# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-05 22:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0013_auto_20170605_2243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='averageppw',
            name='avg_cost',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='installer',
            name='ac_size',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='installer',
            name='cost',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='installer',
            name='dc_size',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='zip',
            name='lat',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='zip',
            name='lon',
            field=models.FloatField(default=0, null=True),
        ),
    ]