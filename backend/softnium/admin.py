from django.contrib import admin
from .models import Gym, Client, Payment

admin.site.register(Gym)
admin.site.register(Client)
admin.site.register(Payment)