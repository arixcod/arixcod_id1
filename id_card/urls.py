from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
   



urlpatterns=[
    path('',views.index,name='index'),
    path('login/',views.loginPage,name='login'),
    path('logout/',views.logoutUser,name='logout'),
    path('icard/',views.chropsPage,name='icard'), 
    path('users/',views.firebase_user_def,name='fire_user') ,
    path('adminr/',views.admin_view,name='admin_view'),
    path('create/',views.create_card,name='create_card'),
    path('clients/',views.User_fire_data,name='clients'),
    path('clients/<int:pk>/edit_conole/',views.dashboard,name='edit_console'),
    path('clients/<int:pk>/generated_cards',views.cards_generated,name='cards_gen'),
    path('clients/<int:pk>/',views.part_fire_user_data,name='part_fire_user_data'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

