from rest_framework import serializers

from StudySpace.models import Building,Student,Room, Reservation, StudySpace

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('building_tag', 'building_name', 'address', 'open_time', 'close_time', 'capacity', 'photo')

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('student_id', 'email', 'student_name')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('room_id', 'building_tag', 'reservation_id')

class StudySpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySpace
        fields = ('study_space_id', 'room_id', 'qr_code', 'seats', 'table', 'availabile')

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('reservation_id', 'student_id', 'study_space_id', 'start_time', 'end_time')

