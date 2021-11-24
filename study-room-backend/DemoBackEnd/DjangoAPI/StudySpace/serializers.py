from rest_framework import serializers

from StudySpace.models import Building,Student,Reservation,StudySpace,Room

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('building_tag', 'building_name', 'address', 'open_time', 'close_time', 'capacity')

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('student_id', 'email', 'student_name')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('room_id', 'building_tag', 'availability')

class StudySpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySpace
        fields = ('study_space_id', 'room_id', 'qr_code', 'seats', 'table', 'status')
class DibSpaceSerializer(serializers.Serializer):
    id=serializers.IntegerField(required=True,allow_null=False)
    study_space_id=serializers.CharField(required=True,allow_null=False)
    room_id=serializers.CharField(source='room_id.room_id')
    open_time=serializers.TimeField(source='room_id.building_tag.open_time')
    close_time=serializers.TimeField(source='room_id.building_tag.close_time')
    availability=serializers.CharField(source='room_id.availability')
    building_tag=serializers.CharField(source='room_id.building_tag.building_tag')
    img_room=serializers.CharField(source='room_id.img_room')
    noise=serializers.CharField(source='room_id.noise')
    img_build= serializers.CharField(source='room_id.building_tag.img_build')
    building_name = serializers.CharField(source='room_id.building_tag.building_name')
    qr_code=serializers.CharField(required=False,allow_null=True)
    seats=serializers.IntegerField(required=True,allow_null=False)
    free_seats = serializers.IntegerField(required=True, allow_null=False)
    table=serializers.CharField(required=False,allow_null=True)
    status=serializers.CharField(required=False,allow_null=True)
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('reservation_id', 'student_id', 'study_space_id', 'start_time', 'end_time','sign_in_status')
class ReserveByStudentSer(serializers.Serializer):
    is_cancel=serializers.IntegerField()
    reservation_id=serializers.CharField()
    room_id=serializers.CharField(source='study_space_id.room_id.room_id')
    table=serializers.CharField(source='study_space_id.table')
    sign_in_status = serializers.IntegerField()
    seats = serializers.IntegerField(source='study_space_id.seats')
    start_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%SZ")
    end_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%SZ")
    avatar= serializers.CharField(source='study_space_id.room_id.building_tag.img_build')
    title=serializers.CharField(source='study_space_id.room_id.building_tag.building_name')
class ReservationAndSpaceSerializer(serializers.Serializer):
    sign_in_status=serializers.IntegerField()
    seats=serializers.IntegerField(source='study_space_id.seats')
    start_time=serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    end_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
