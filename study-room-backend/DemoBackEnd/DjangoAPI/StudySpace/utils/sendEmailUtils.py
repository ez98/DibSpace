import random
import string

from django.core.mail import send_mail

from DjangoAPI.settings import EMAIL_FROM
from django.core.cache import cache

def random_str(randomlenth=8):
    str_all = string.ascii_letters + string.digits
    send_str = random.sample(str_all, randomlenth)
    send_str = "".join(send_str)
    return send_str


def send_register_email(type,email):
    code = random_str()
    if type=='register':
        email_title = 'DibSpace Register Verification Code'
    else:
        email_title = 'DibSpace Verification Code'
    email_body = f"Verification code:\n{code}"
    cache.set("{}:{}".format(type,email), code, 600)
    send_status = send_mail(email_title, email_body, EMAIL_FROM, [email])
    return send_status
