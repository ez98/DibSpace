# Generated by Django 3.2.8 on 2021-10-27 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StudySpace', '0003_reservation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='student_id',
            field=models.CharField(max_length=40, primary_key=True, serialize=False),
        ),
    ]