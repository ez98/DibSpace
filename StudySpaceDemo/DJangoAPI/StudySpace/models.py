from django.db import models

# Create your models here.

class Student(models.Model):
    student_id = models.CharField(max_length=40, primary_key=True)
    email = models.CharField(max_length=50)
    student_name = models.CharField(max_length=45)

class Building(models.Model):
    building_tag = models.CharField(max_length=45, primary_key= True)
    building_name = models.CharField(max_length=45)
    address = models.CharField(max_length=45)
    open_time = models.TimeField(auto_now_add=False)
    close_time = models.TimeField(auto_now_add=False)
    capacity = models.IntegerField() 
    photo = models.CharField(max_length=500, null=True)

class Room(models.Model):
    room_id = models.CharField(max_length=10, primary_key=True)
    building_tag = models.ForeignKey(Building, on_delete=models.CASCADE)
    availability = models.CharField(max_length=45) #change to availabile

class StudySpace(models.Model):
    study_space_id = models.CharField(max_length=16)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    qr_code = models.CharField(max_length=45)
    seats = models.IntegerField()
    table = models.BooleanField()
    availabile = models.BooleanField()

class Reservation(models.Model):
    reservation_id = models.CharField(max_length=7)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    study_space_id = models.ForeignKey(StudySpace, on_delete=models.CASCADE)
    start_time = models.TimeField(auto_now_add=False)
    end_time = models.TimeField(auto_now_add=False)

    #     {
    #     "building_tag": "WH",
    #     "building_name": "Wishnick Hall",
    #     "address": "3255 South Dearborn Street, Chicago, IL 60616",
    #     "open_time": "08:00:00",
    #     "close_time": "10:00:00",
    #     "capacity": 2500,
    #     "photo": "wishnick.jpg"
    # }


