# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-01 21:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_installers'),
    ]

    operations = [
        migrations.CreateModel(
            name='Installer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_city', models.CharField(max_length=55)),
                ('zipcode', models.CharField(max_length=5)),
                ('service_county', models.CharField(max_length=35)),
                ('dc_size', models.FloatField(default=0)),
                ('ac_size', models.FloatField(default=0)),
                ('installer', models.CharField(max_length=200)),
                ('cost', models.FloatField(default=0)),
            ],
        ),
        migrations.DeleteModel(
            name='Installers',
        ),
    ]
