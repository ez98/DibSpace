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
    img_build = models.CharField(max_length=255)

class Room(models.Model):
    room_id = models.CharField(max_length=10, primary_key=True)
    building_tag = models.ForeignKey(Building, on_delete=models.CASCADE)
    availability = models.CharField(max_length=45)
    noise = models.CharField(max_length=45)
    img_room=models.CharField(max_length=255)

class StudySpace(models.Model):
    study_space_id = models.CharField(max_length=16)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    qr_code = models.CharField(max_length=45)
    seats = models.IntegerField()
    free_seats=models.IntegerField()
    table = models.CharField(max_length=5)
    status = models.CharField(max_length=45)

class Reservation(models.Model):
    reservation_id = models.CharField(max_length=45)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    study_space_id = models.ForeignKey(StudySpace, on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=False)
    end_time = models.DateTimeField(auto_now_add=False)
    sign_in_status=models.IntegerField(default=0)
    is_delete=models.IntegerField(default=0)
    is_cancel=models.IntegerField(default=0)


