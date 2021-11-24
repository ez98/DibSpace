from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from StudySpace.models import Building, Student, Reservation, StudySpace, Room
from StudySpace.serializers import BuildingSerializer, StudentSerializer, ReservationSerializer, StudySpaceSerializer, \
    RoomSerializer, DibSpaceSerializer, ReservationAndSpaceSerializer, ReserveByStudentSer
import datetime
import pickle
from django_redis import get_redis_connection
import uuid
from django.core.cache import cache

from StudySpace.utils.tokenUtil import checklogin, getUserInfo
from django.db.models import Q

conn = get_redis_connection('default')

# building
from StudySpace.utils.sendEmailUtils import send_register_email, send_reserve_success


@csrf_exempt
def buildingApi(request, id=0):
    if request.method == 'GET':  # GET retrieves data from the server
        buildings = Building.objects.all()  # retrieve all data in db
        building_serializer = BuildingSerializer(buildings, many=True)  # convert query sets from db to python datatypes
        return JsonResponse(building_serializer.data, safe=False)  # render data into JSON format and return

    elif request.method == 'POST':  # POST sends data to the API server
        building_data = JSONParser().parse(request)  # get data from post request
        building_serializer = BuildingSerializer(data=building_data)  # conver to python datatypes

        if building_serializer.is_valid():  # check if data is valid
            building_serializer.save()  # if it is, save the data
            return JsonResponse("Add Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':  # send data to the the API server to update a specific db table
        building_data = JSONParser().parse(request)
        buildings = Building.objects.get(
            building_tag=building_data['building_tag'])  # update building_tag with the tag sent to the API server
        building_serializer = BuildingSerializer(buildings, data=building_data)  # convert to python native code

        if building_serializer.is_valid():
            building_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        buildings = Building.objects.get(building_tag=id)  ##deletes using the specified building id or tag
        buildings.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def userInfoApi(request):
    if request.method == 'GET':
        token = checklogin(request)
        if token:
            return JsonResponse({'state': True, 'info': token}, safe=False)
        else:
            return JsonResponse({'state': False}, safe=False)


@csrf_exempt
def fetchReserveByStudent(request, id=None):
    if request.method == 'GET':
        userInfo = getUserInfo(request)
        if userInfo!=None:
            reservations = Reservation.objects.filter(student_id__email=userInfo['email'],is_delete=0)
            reservationListSer = ReserveByStudentSer(reservations, many=True)
            return JsonResponse(reservationListSer.data, safe=False)  # return JSON data
    if request.method=='POST':
        query=JSONParser().parse(request)
        userInfo = getUserInfo(request)
        if userInfo != None:
            if query['method']=='delete':
                try:
                    Reservation.objects.filter(student_id__email=userInfo['email'],reservation_id=query['id']).update(is_delete=1)
                    return JsonResponse({'state':True}, safe=False)  # return JSON data
                except:
                    return JsonResponse({'state':False}, safe=False)  # return JSON data
            if query['method'] == 'signIn':
                try:
                    Reservation.objects.filter(student_id__email=userInfo['email'], reservation_id=query['id']).update(
                        sign_in_status=1)
                    return JsonResponse({'state': True}, safe=False)  # return JSON data
                except:
                    return JsonResponse({'state': False}, safe=False)  # return JSON data
            if query['method'] == 'cancel':
                try:
                    Reservation.objects.filter(student_id__email=userInfo['email'], reservation_id=query['id']).update(
                        is_cancel=1)
                    return JsonResponse({'state': True}, safe=False)  # return JSON data
                except:
                    return JsonResponse({'state': False}, safe=False)  # return JSON data
            if query['method'] == 'recover':
                try:
                    Reservation.objects.filter(student_id__email=userInfo['email'], reservation_id=query['id']).update(
                        is_cancel=0)
                    return JsonResponse({'state': True}, safe=False)  # return JSON data
                except:
                    return JsonResponse({'state': False}, safe=False)  # return JSON data


# Student
@csrf_exempt
def studentApi(request, email=None):
    if request.method == 'GET':
        students = Student.objects.all()  # retrieve all data in db
        student_serializer = StudentSerializer(students, many=True)  # convert to JSON
        return JsonResponse(student_serializer.data, safe=False)  # return JSON data
    elif request.method == 'POST':
        if email != None:
            students = Student.objects.filter(email=email)
            if len(students) == 0:
                return JsonResponse({'state': False, 'message': 'Please register first'}, safe=False)
            loginInfo = JSONParser().parse(request)
            try:
                code = pickle.loads(conn.get('DibSpace:1:{}:{}'.format('login', email)))
            except Exception as e:
                code = None
            if code and loginInfo['code'] != code:
                return JsonResponse({'state': False, 'message': 'Verification code error'}, safe=False)
            student_serializer = StudentSerializer(students, many=True)  # convert to JSON
            token = ''.join(str(uuid.uuid4()).split('-'))
            cache.set("token:{}".format(token), student_serializer.data[0], 60 * 60 * 10)
            return JsonResponse({'state': True, 'token': token, 'message': 'Login Success!'}, safe=False)

        else:
            student_data = JSONParser().parse(request)  # get data from post request
            students = Student.objects.filter(email=student_data['email'])
            if len(students) > 0:
                return JsonResponse({'state': False, 'message': 'Registered mailbox'}, safe=False)
            try:
                code = pickle.loads(conn.get('DibSpace:1:{}:{}'.format('register', student_data['email'])))
            except Exception as e:
                code = None
            if code and student_data['code'] != code:
                return JsonResponse({'state': False, 'message': 'Verification code error'}, safe=False)
            del student_data['code']

            student_serializer = StudentSerializer(data=student_data)
            if student_serializer.is_valid():
                student_serializer.save()
                return JsonResponse({'state': True, 'message': 'Sign Up Successfully'}, safe=False)
            return JsonResponse({'state': False, 'message': 'Sign Up Failure'}, safe=False)



    elif request.method == 'PUT':
        student_data = JSONParser().parse(request)
        students = Student.objects.get(student_id=student_data['student_id'])
        student_serializer = StudentSerializer(students, data=student_data)

        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        students = Student.objects.get(student_id=id)
        students.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def sendEmailApi(request, id=0):
    if request.method == 'GET':
        sendTo = request.GET.get('sendTo')
        type = request.GET.get('type')
        if type == 'register':
            student = Student.objects.filter(email=sendTo)
            if len(student) > 0:
                return JsonResponse({'state': False, 'message': 'No Double Sign Up'}, safe=False)  # return JSON data
        res = send_register_email(type, sendTo)
        if res:
            return JsonResponse({'state': True, 'message': 'send success'}, safe=False)  # return JSON data
        else:
            return JsonResponse({'state': False, 'message': 'send failure'}, safe=False)  # return JSON data


# Reservation
@csrf_exempt
def reservationApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            reservations = Reservation.objects.filter(study_space_id=id)  # retrieve all data in db
            reservation_serializer = ReservationAndSpaceSerializer(reservations, many=True)  # convert to JSON
            study_space = StudySpace.objects.filter(id=id)
            study_space_serializer = StudySpaceSerializer(study_space, many=True)
            allSeats = study_space_serializer.data[0]['seats']
            seat = 0
            for ReservationAndSpace in reservation_serializer.data:
                if datetime.datetime.strptime(ReservationAndSpace['start_time'],
                                              "%Y-%m-%d %H:%M:%S") > datetime.datetime.utcnow() \
                        or (ReservationAndSpace['sign_in_status'] == 1 and datetime.datetime.strptime(
                    ReservationAndSpace['end_time'],
                    "%Y-%m-%d %H:%M:%S") > datetime.datetime.utcnow()):
                    seat += 1
            StudySpace.objects.filter(id=id).update(free_seats=allSeats - seat)

            return JsonResponse({'allSeats': allSeats, 'seat': seat}, safe=False)  # return JSON data
        else:
            reservations = Reservation.objects.all()  # retrieve all data in db
            reservation_serializer = ReservationSerializer(reservations, many=True)  # convert to JSON
            return JsonResponse(reservation_serializer.data, safe=False)  # return JSON data



    elif request.method == 'POST':

        reservation_data = JSONParser().parse(request)  # get data from post request
        userInfo = checklogin(request)
        reservation_data['student_id'] = userInfo['student_id']
        reservations = Reservation.objects.filter(student_id=reservation_data['student_id'],is_cancel=0,is_delete=0)
        reservation_serializer_list = ReservationSerializer(reservations, many=True)  # convert to JSON
        for reservation in reservation_serializer_list.data:
            if datetime.datetime.strptime(reservation['end_time'],
                                          "%Y-%m-%dT%H:%M:%SZ") > datetime.datetime.utcnow() > datetime.datetime.strptime(
                    reservation['start_time'], "%Y-%m-%dT%H:%M:%SZ") \
                    and reservation['sign_in_status'] == 1:
                return JsonResponse({'state': False, 'message': "Failed to Add，No double booking"}, safe=False)
            if datetime.datetime.strptime(reservation['start_time'], "%Y-%m-%dT%H:%M:%SZ") > datetime.datetime.utcnow():
                return JsonResponse({'state': False, 'message': "Failed to Add，No double booking"}, safe=False)

        reservations = Reservation.objects.filter(
            study_space_id=reservation_data['study_space_id'])  # retrieve all data in db
        reservation_serializer = ReservationAndSpaceSerializer(reservations, many=True)  # convert to JSON
        student_space = StudySpace.objects.filter(id=reservation_data['study_space_id'])
        student_space_ser = StudySpaceSerializer(student_space, many=True)
        allSeats = student_space_ser.data[0]['seats']
        seat = 1
        for ReservationAndSpace in reservation_serializer.data:
            if datetime.datetime.strptime(ReservationAndSpace['end_time'],
                                          "%Y-%m-%d %H:%M:%S") > datetime.datetime.utcnow():
                seat += 1
        if seat >= allSeats:
            return JsonResponse({'state': False, 'message': "The seat is full"}, safe=False)
        reservation_data['start_time'] = datetime.datetime.strptime(reservation_data['start_time'],
                                                                    '%Y-%m-%dT%H:%M:%S.%fZ')
        reservation_data['end_time'] = datetime.datetime.strptime(reservation_data['end_time'], '%Y-%m-%dT%H:%M:%S.%fZ')
        reservation_serializer = ReservationSerializer(data=reservation_data)
        StudySpace.objects.filter(id=reservation_data['study_space_id']).update(free_seats=allSeats - seat)
        reserve_status = send_reserve_success(reservation_data['reservation_id'], userInfo['email'],
                                              reservation_data['start_time'], reservation_data['end_time'])
        if reservation_serializer.is_valid() and reserve_status:
            reservation_serializer.save()
            studyspaces = StudySpace.objects.filter(id=reservation_data['study_space_id'])
            studyspace_serializer = DibSpaceSerializer(studyspaces, many=True)
            return JsonResponse({'state': True, 'message': "reserve Successfully", 'reserve_data': reservation_data,
                                 'study_space_data': studyspace_serializer.data[0]}, safe=False)
        return JsonResponse({'state': False, 'message': "Failed to Add"}, safe=False)

    elif request.method == 'PUT':
        reservation_data = JSONParser().parse(request)
        reservations = Reservation.objects.get(reservation_id=reservation_data['reservation_id'])
        reservation_serializer = ReservationSerializer(reservations, data=reservation_data)

        if reservation_serializer.is_valid():
            reservation_serializer.save()
            return JsonResponse({'state': True, 'message': "Updated Successfully"}, safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        reservations = Reservation.objects.get(reservation_id=id)
        reservations.delete()
        return JsonResponse("Deleted Successfully", safe=False)


# Study Space
@csrf_exempt
def studyspaceApi(request, id=0):
    if request.method == 'GET':
        searchKey = request.GET.get('searchKey')
        studyspaces = StudySpace.objects.all()
        studyspace_serializer = DibSpaceSerializer(studyspaces, many=True)  # convert to JSON
        for stydespace in studyspace_serializer.data:
            reservations = Reservation.objects.filter(study_space_id=stydespace['id'],is_cancel=0)  # retrieve all data in db
            reservation_serializer = ReservationAndSpaceSerializer(reservations, many=True)  # convert to JSON
            study_space = StudySpace.objects.filter(id=stydespace['id'])
            study_space_serializer = StudySpaceSerializer(study_space, many=True)
            allSeats = study_space_serializer.data[0]['seats']
            seat = 0
            for ReservationAndSpace in reservation_serializer.data:
                if datetime.datetime.strptime(ReservationAndSpace['start_time'],
                                              "%Y-%m-%d %H:%M:%S") > datetime.datetime.utcnow() \
                        or (ReservationAndSpace['sign_in_status'] == 1 and datetime.datetime.strptime(
                    ReservationAndSpace['end_time'],
                    "%Y-%m-%d %H:%M:%S") > datetime.datetime.utcnow()):
                    seat += 1
            StudySpace.objects.filter(id=stydespace['id']).update(free_seats=allSeats - seat)
        if searchKey is None:
            studyspaces = StudySpace.objects.all()  # retrieve all data in db
            studyspace_serializer = DibSpaceSerializer(studyspaces, many=True)  # convert to JSON
            return JsonResponse(studyspace_serializer.data, safe=False)  # return JSON data
        else:
            studyspaces = StudySpace.objects.filter(room_id__building_tag__building_name__contains=searchKey)
            studyspace_serializer = DibSpaceSerializer(studyspaces, many=True)  # convert to JSON
            return JsonResponse(studyspace_serializer.data, safe=False)  # return JSON data



    elif request.method == 'POST':
        studyspace_data = JSONParser().parse(request)  # get data from post request
        studyspace_serializer = StudySpaceSerializer(data=studyspace_data)

        if studyspace_serializer.is_valid():
            studyspace_serializer.save()
            return JsonResponse("Add Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        studyspace_data = JSONParser().parse(request)
        studyspaces = StudySpace.objects.get(studyspace_id=studyspace_data['study_space_id'])
        studyspace_serializer = StudySpaceSerializer(studyspaces, data=studyspace_data)

        if studyspace_serializer.is_valid():
            studyspace_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        studyspaces = StudySpace.objects.get(study_space_id=id)
        studyspaces.delete()
        return JsonResponse("Deleted Successfully", safe=False)


# Room
@csrf_exempt
def roomApi(request, id=0):
    if request.method == 'GET':
        rooms = Room.objects.all()  # retrieve all data in db
        room_serializer = RoomSerializer(rooms, many=True)  # convert to JSON
        return JsonResponse(room_serializer.data, safe=False)  # return JSON data

    elif request.method == 'POST':

        room_data = JSONParser().parse(request)  # get data from post request

        room_serializer = RoomSerializer(data=room_data)

        if room_serializer.is_valid():
            room_serializer.save()
            return JsonResponse("Add Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        room_data = JSONParser().parse(request)
        rooms = Room.objects.get(room_id=room_data['room_id'])
        room_serializer = RoomSerializer(rooms, data=room_data)

        if room_serializer.is_valid():
            room_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        rooms = Room.objects.get(room_id=id)
        rooms.delete()
        return JsonResponse("Deleted Successfully", safe=False)
