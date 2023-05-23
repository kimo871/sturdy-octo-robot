# Generated by Django 4.2.1 on 2023-05-23 19:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(max_length=100)),
                ('lname', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('address', models.CharField(default='ff', max_length=100)),
                ('phone', models.PositiveBigIntegerField()),
                ('vac_available', models.PositiveBigIntegerField(default=5)),
                ('salary', models.PositiveBigIntegerField(default=3500)),
                ('birth', models.DateField(default='1999-01-17')),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], default='Female', max_length=50, null=True)),
                ('status', models.CharField(choices=[('Single', 'Single'), ('Married', 'Married')], default='Single', max_length=50, null=True)),
                ('Department', models.CharField(choices=[(0, 'Public Safety and emergency services'), (1, 'Student Affairs and services'), (2, 'Academic Staff'), (3, 'Financial Affairs'), (4, 'Human Resources')], default=3, max_length=50)),
                ('index', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateField(default='1999-01-17')),
                ('end', models.DateField(default='1999-01-17')),
                ('reason', models.TextField(default=' ')),
                ('rest', models.PositiveIntegerField(default=0)),
                ('status', models.BooleanField(default=False)),
                ('employee_id', models.ForeignKey(default=8, on_delete=django.db.models.deletion.CASCADE, to='Employees.employee')),
            ],
        ),
    ]