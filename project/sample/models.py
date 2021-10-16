from django.db import models

class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()

class Students(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    objects = models.Manager()

class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    availablity = models.BooleanField()
    building = models.CharField(max_length=255)
    objects = models.Manager()

# Create your models here.
