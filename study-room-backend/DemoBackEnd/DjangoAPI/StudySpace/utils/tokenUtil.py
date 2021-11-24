import pickle

from django_redis import get_redis_connection
conn = get_redis_connection('default')
from django.core.cache import cache

def checklogin(request):
    redisid = request.META.get('HTTP_AUTHORIZATION')

    if not redisid:
        return None
    else:
        try:
            token = pickle.loads(conn.get("DibSpace:1:token:{}".format(redisid.split('Bearer ')[1])))
            cache.set("token:{}".format(redisid), token, 60 * 60 * 10)
            return token
        except:
            return None
def getUserInfo(request):
    redisid = request.META.get('HTTP_AUTHORIZATION')
    if not redisid:
        return None
    else:
        try:
            userInfo = pickle.loads(conn.get("DibSpace:1:token:{}".format(redisid.split('Bearer ')[1])))
            return userInfo
        except:
            return None