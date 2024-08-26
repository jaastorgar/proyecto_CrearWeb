from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/customer_chat/(?P<chat_id>\w+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/customer_service/$', consumers.CustomerServiceConsumer.as_asgi()),
]