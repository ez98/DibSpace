from django.conf.urls import url
from StudySpace import views


urlpatterns =[
    url(r'^user-info$',views.userInfoApi),
    url(r'^send-email$',views.sendEmailApi),
    url(r'^send-email/([0-9]+)$',views.sendEmailApi),
    url(r'^building$', views.buildingApi),
    url(r'^building/([0-9]+)$', views.buildingApi),

    url(r'^student$', views.studentApi),
    url(r'^student/([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+)$', views.studentApi),
    url(r'^fetch-reserve-by-student$', views.fetchReserveByStudent),

    url(r'^reservation$', views.reservationApi),
    url(r'^reservation/([0-9]+)$', views.reservationApi),

    url(r'^studyspace$', views.studyspaceApi),
    url(r'^studyspace/([0-9]+)$', views.studyspaceApi),

    url(r'^room$', views.roomApi),
    url(r'^room/([0-9]+)$', views.roomApi)
]