# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-04 01:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('faq_app', '0002_auto_20170503_1209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='status',
            field=models.IntegerField(choices=[(1, 'Active'), (0, 'Inactive')], default=1, max_length=1),
        ),
    ]
