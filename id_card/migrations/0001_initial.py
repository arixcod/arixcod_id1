# Generated by Django 4.2.2 on 2023-07-04 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='fire_User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=164)),
                ('bussines_name', models.CharField(max_length=200)),
                ('adress', models.CharField(max_length=200)),
                ('phone_No', models.IntegerField()),
                ('paswword', models.CharField(max_length=30)),
            ],
        ),
    ]
