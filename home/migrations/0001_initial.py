# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-01 18:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Zip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zipcode', models.CharField(max_length=5)),
                ('lon', models.FloatField()),
                ('lat', models.FloatField()),
            ],
        ),
    ]
