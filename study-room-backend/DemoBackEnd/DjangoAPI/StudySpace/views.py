from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from StudySpace.models import Building,Student,Reservation,StudySpace,Room
from StudySpace.serializers import BuildingSerializer, StudentSerializer, ReservationSerializer, StudySpaceSerializer, \
    RoomSerializer, DibSpaceSerializer, ReservationAndSpaceSerializer
import datetime
#building
@csrf_exempt
def buildingApi(request, id=0): 
    if request.method == 'GET': #GET retrieves data from the server 
        buildings = Building.objects.all() #retrieve all data in db
        building_serializer = BuildingSerializer(buildings, many=True) #convert query sets from db to python datatypes
        return JsonResponse(building_serializer.data, safe=False) #render data into JSON format and return

    elif request.method == 'POST': #POST sends data to the API server
        building_data = JSONParser().parse(request) #get data from post request
        building_serializer = BuildingSerializer(data = building_data) #conver to python datatypes

        if building_serializer.is_valid(): #check if data is valid
            building_serializer.save() #if it is, save the data
            return JsonResponse("Add Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False) 

    elif request.method == 'PUT': #send data to the the API server to update a specific db table
        building_data = JSONParser().parse(request)
        buildings = Building.objects.get(building_tag = building_data['building_tag']) #update building_tag with the tag sent to the API server
        building_serializer = BuildingSerializer(buildings, data = building_data) #convert to python native code
        
        if building_serializer.is_valid():
            building_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        buildings = Building.objects.get(building_tag = id) ##deletes using the specified building id or tag
        buildings.delete()
        return JsonResponse("Deleted Successfully", safe=False)

#Student
@csrf_exempt
def studentApi(request, id=0): 
    if request.method == 'GET':
        students = Student.objects.all() #retrieve all data in db
        student_serializer = StudentSerializer(students, many=True) #convert to JSON
        return JsonResponse(student_serializer.data, safe=False) #return JSON data

    elif request.method == 'POST':
        student_data = JSONParser().parse(request) #get data from post request
        student_serializer = StudentSerializer(data = student_data)

        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Add Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        student_data = JSONParser().parse(request)
        students = Student.objects.get(student_id = student_data['student_id'])
        student_serializer = StudentSerializer(students, data = student_data)
        
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        students = Student.objects.get(student_id = id)
        students.delete()
        return JsonResponse("Deleted Successfully", safe=False)

#Reservation
@csrf_exempt
def reservationApi(request, id=0):
    if request.method == 'GET':
        if id!=0:
            reservations = Reservation.objects.filter(study_space_id=id)  # retrieve all data in db
            reservation_serializer = ReservationAndSpaceSerializer(reservations, many=True)  # convert to JSON
            study_space=StudySpace.objects.filter(id=id)
            study_space_serializer=StudySpaceSerializer(study_space,many=True)
            allSeats=study_space_serializer.data[0]['seats']
            seat=0
            for ReservationAndSpace in reservation_serializer.data:
                if datetime.datetime.strptime(ReservationAndSpace['end_time'],"%Y-%m-%d %H:%M:%S")>datetime.datetime.utcnow():
                    seat+=1
            StudySpace.objects.filter(id=id).update(free_seats=allSeats-seat)

            return JsonResponse({'allSeats':allSeats,'seat':seat}, safe=False)  # return JSON data
        else:
            reservations = Reservation.objects.all()  # retrieve all data in db
            reservation_serializer = ReservationSerializer(reservations, many=True)  # convert to JSON
            return JsonResponse(reservation_serializer.data, safe=False)  # return JSON data



    elif request.method == 'POST':

        reservation_data = JSONParser().parse(request) #get data from post request
        reservations = Reservation.objects.filter(student_id=reservation_data['student_id'])
        reservation_serializer_list = ReservationSerializer(reservations, many=True) #convert to JSON
        for reservation in reservation_serializer_list.data:
            if datetime.datetime.strptime(reservation['end_time'],"%Y-%m-%dT%H:%M:%SZ")>datetime.datetime.utcnow():
                return JsonResponse({'state': False, 'message': "Failed to Add，No double booking"}, safe=False)
        reservations = Reservation.objects.filter(study_space_id=reservation_data['study_space_id'])  # retrieve all data in db
        reservation_serializer = ReservationAndSpaceSerializer(reservations, many=True)  # convert to JSON
        student_space=StudySpace.objects.filter(id=reservation_data['study_space_id'])
        student_space_ser=StudySpaceSerializer(student_space,many=True)
        allSeats =student_space_ser.data[0]['seats']
        seat = 1
        for ReservationAndSpace in reservation_serializer.data:
            if datetime.datetime.strptime(ReservationAndSpace['end_time'],
                                          "%Y-%m-%d %H:%M:%S") > datetime.datetime.utcnow():
                seat += 1
        if seat>=allSeats:
            return JsonResponse({'state': False, 'message': "The seat is full"}, safe=False)
        reservation_data['start_time'] = datetime.datetime.strptime(reservation_data['start_time'], '%Y-%m-%dT%H:%M:%S.%fZ')
        reservation_data['end_time'] = datetime.datetime.strptime(reservation_data['end_time'], '%Y-%m-%dT%H:%M:%S.%fZ')
        reservation_serializer = ReservationSerializer(data = reservation_data)
        StudySpace.objects.filter(id=reservation_data['study_space_id']).update(free_seats=allSeats-seat)
        if reservation_serializer.is_valid():
            reservation_serializer.save()
            studyspaces = StudySpace.objects.filter(id=reservation_data['study_space_id'])
            studyspace_serializer = DibSpaceSerializer(studyspaces, many=True)
            return JsonResponse({'state':True,'message':"ADD Successfully",'reserve_data':reservation_data,'study_space_data':studyspace_serializer.data[0]}, safe=False)
        return JsonResponse({'state':False,'message':"Failed to Add"}, safe=False)

    elif request.method == 'PUT':
        reservation_data = JSONParser().parse(request)
        reservations = Reservation.objects.get(reservation_id=reservation_data['reservation_id'])
        reservation_serializer = ReservationSerializer(reservations, data = reservation_data)
        
        if reservation_serializer.is_valid():
            reservation_serializer.save()
            return JsonResponse({'state':True,'message':"Updated Successfully"}, safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        reservations = Reservation.objects.get(reservation_id = id)
        reservations.delete()
        return JsonResponse("Deleted Successfully", safe=False)

#Study Space 
@csrf_exempt
def studyspaceApi(request, id=0): 
    if request.method == 'GET':
        studyspaces = StudySpace.objects.all() #retrieve all data in db
        studyspace_serializer = DibSpaceSerializer(studyspaces, many=True) #convert to JSON
        return JsonResponse(studyspace_serializer.data, safe=False) #return JSON data

    elif request.method == 'POST':
        studyspace_data = JSONParser().parse(request) #get data from post request
        studyspace_serializer = StudySpaceSerializer(data = studyspace_data)

        if studyspace_serializer.is_valid():
            studyspace_serializer.save()
            return JsonResponse("Add Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        studyspace_data = JSONParser().parse(request)
        studyspaces = StudySpace.objects.get(studyspace_id=studyspace_data['study_space_id'])
        studyspace_serializer = StudySpaceSerializer(studyspaces, data = studyspace_data)

        if studyspace_serializer.is_valid():
            studyspace_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        studyspaces = StudySpace.objects.get(study_space_id = id)
        studyspaces.delete()
        return JsonResponse("Deleted Successfully", safe=False)

#Room
@csrf_exempt
def roomApi(request, id=0): 
    if request.method == 'GET':
        rooms = Room.objects.all() #retrieve all data in db
        room_serializer = RoomSerializer(rooms, many=True) #convert to JSON
        return JsonResponse(room_serializer.data, safe=False) #return JSON data

    elif request.method == 'POST':

        room_data = JSONParser().parse(request) #get data from post request

        room_serializer = RoomSerializer(data = room_data)

        if room_serializer.is_valid():
            room_serializer.save()
            return JsonResponse("Add Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        room_data = JSONParser().parse(request)
        rooms = Room.objects.get(room_id=room_data['room_id'])
        room_serializer = RoomSerializer(rooms, data = room_data)
        
        if room_serializer.is_valid():
            room_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")

    elif request.method == 'DELETE':
        rooms = Room.objects.get(room_id = id)
        rooms.delete()
        return JsonResponse("Deleted Successfully", safe=False)