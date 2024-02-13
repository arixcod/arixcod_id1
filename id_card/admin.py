from django.contrib import admin
from .models import fire_User 
from .models import canvas_data,generated_canvas
# Register your models here.

admin.site.register(fire_User)
admin.site.register(canvas_data)
admin.site.register(generated_canvas)