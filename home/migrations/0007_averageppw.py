# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-03 21:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_auto_20170602_1755'),
    ]

    operations = [
        migrations.CreateModel(
            name='AveragePPW',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('installer', models.CharField(max_length=200)),
                ('avg_cost', models.FloatField(default=0)),
            ],
        ),
    ]