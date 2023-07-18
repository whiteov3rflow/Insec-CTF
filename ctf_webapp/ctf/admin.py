from django.contrib import admin
from .models import UserProfile, Questions, Submission
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Questions)
admin.site.register(Submission)