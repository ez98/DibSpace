from DjangoAPI import settings
from django.utils.deprecation import MiddlewareMixin
from django_redis import get_redis_connection
from django.shortcuts import HttpResponse
from StudySpace.utils.tokenUtil import checklogin
from django.http.response import JsonResponse

conn = get_redis_connection()
class SimpleMiddleware(MiddlewareMixin):
    def process_request(self,request):
        cuser = checklogin(request)
        if request.path_info in settings.WHITE_URL:
            return
        if 'student' in request.path_info:
            return
        if 'reservation' in request.path_info and request.method=='GET':
            return
        if not cuser:
            res = JsonResponse(data={'code': 401, 'data': 'Please login in！'}, status=401)
            return res
        else:
            return

    # def process_response(self,request,response):
    #     return response
        # if conn.get('user_py') and request.COOKIES.get('user'):
        #     if request.COOKIES.get('sso'):
        #         # request.session['user_py'] = request.session['user_py']
        #         # conn.set(conn.get(request.COOKIES.get('sessionid')), request.COOKIES.get('user_py'), 8 * 60 * 60)
        #         # request.session.set_expiry(3600 * 4)
        #         res = response
        #         # res.set_cookie('sessionid', request.COOKIES.get('sessionid'), max_age=3600 * 4)
        #         res.set_cookie('redisid', request.COOKIES.get('redisid'), max_age=3600 * 4)
        #         res.set_cookie('user', request.COOKIES.get('user'), max_age=3600 * 4)
        #         res.set_cookie('user_py', request.COOKIES.get('user_py'), max_age=3600 * 4)
        #         res.set_cookie('role_id', request.COOKIES.get('role_id'), max_age=3600 * 4)
        #         res.set_cookie('role', request.COOKIES.get('role'), max_age=3600 * 4)
        #         res.set_cookie('csrftoken', request.COOKIES.get('csrftoken'), max_age=3600 * 4)
        #         res.set_cookie('sso', request.COOKIES.get('sso'), max_age=3600 * 4)
        #
        #         return res
        #     else:
        #         return response
        # else:
        #     return response
