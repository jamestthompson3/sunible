# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-05 22:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0011_auto_20170605_1811'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricInstalls',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('installer', models.CharField(max_length=200)),
                ('county', models.CharField(max_length=35)),
            ],
        ),
    ]