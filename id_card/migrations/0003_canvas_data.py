# Generated by Django 4.2.2 on 2023-08-02 19:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('id_card', '0002_remove_fire_user_paswword'),
    ]

    operations = [
        migrations.CreateModel(
            name='canvas_data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_length', models.IntegerField()),
                ('object_fields', models.CharField(max_length=600)),
                ('canvas_adress', models.CharField(max_length=10000)),
                ('full_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='id_card.fire_user')),
            ],
        ),
    ]