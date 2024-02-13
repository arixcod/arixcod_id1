from django.shortcuts import render,redirect
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import firebase_admin
from firebase_admin import credentials,auth
from firebase_admin import firestore
import threading
from .models import fire_User,generated_canvas
from django.urls import reverse
from django.views import View





user_data_fire_new=[]

# Use a service account to get the firestore data

if not firebase_admin._apps:
    cred = credentials.Certificate('id_card/key_file/chropsicard-1285575e1473.json')
    app = firebase_admin.initialize_app(cred)

db = firestore.client()   
users_ref = db.collection("user-cards").document('9Xl8yuHOz7Wk9PgGI8AsCWQVdXl1').collection('user-id-cards')

# Create an Event for notifying main thread.
callback_done = threading.Event()
# Create a callback on_snapshot function to capture changes

def on_snapshot(doc_snapshot, changes, read_time):
    user_data_fire_new.clear()
    for doc in doc_snapshot:
        user_data_fire_new.append(doc.to_dict())
    callback_done.set()




# docs = users_ref.stream()
# for doc in docs:  
#    user_data.append(doc.to_dict())


@login_required(login_url='login')
def firebase_user_def(request):
    #user=auth.create_user(email='anand8009@gamil.com',password="Arix@1697")
    user1=auth.get_user(uid='UvKbcvwv2IYMCElxf2b7z0Wwnsg1')
    print(user1)
    return render(request,'firebase_user_data.html',{
          "user_dat":user_data_fire_new          
        })

# Create your views here.
# to work with the restricted page with login required
@login_required(login_url='login')
def chropsPage(request):   
    return render(request,'chrops_card.html')



def loginPage(request):

    if request.method=='POST':
        username=request.POST.get('username')
        password=request.POST.get('password')
        
        try:
            user=User.objects.get(username=username)
        except:
            messages.error(request, "User Does Not Exist !")
        user =authenticate(request,username=username,password=password)       
       
        if user is not None:
            login(request,user)
            return redirect('index')
        else:
            messages.error(request,"Username is not registered")
    context ={}
    return render(request,'login_reg.html',context)

def logoutUser(request):
    logout(request)
    return redirect('index')

def index(request):
    return render(request,'index.html')


def admin_view(request):
    return render(request,'id_card/creators_panel.html')


def create_card(request):
    if request.method=="POST":

        if request.POST.get('Name')=='' or request.POST.get('email') or request.POST.get('password'):
            messages.error(request,"Name , Email or Password fields Can't be empty !")
        if str(request.POST.get('password'))!=str(request.POST.get('confirmpassword')):
            messages.error(request,"Password didn't Match")
        else:  
            name=request.POST.get('Name')
            email=request.POST.get('email')
            business=request.POST.get('busname')
            adress=request.POST.get('adress')
            phone=request.POST.get('phone')
            password=request.POST.get('password')
            
            try:
                info= auth.create_user(email=email,password=password)    
                user_f= fire_User(full_name=name,email=email,bussines_name=business,adress=adress,phone_No=phone)
                user_f.save()
 
            except Exception as e:
                messages.error(request,str(e))
                   

    return render(request,'id_card/create_card.html')




# now we will create the view function for the retriving all the data

@login_required(login_url='login')
def User_fire_data(request): 
 querry=request.GET.get('querry') if request.GET.get('querry') !=None else ''
 userdata=fire_User.objects.filter(full_name__icontains=querry)
 return render(request,'id_card/client_page.html',{
     'all_data':userdata
 })


@login_required(login_url='login')
def part_fire_user_data(request,pk):

    # querry=request.GET.get('querry') if request.GET.get('querry') !=None else ''
    # return HttpResponseRedirect(reverse('part_fire_user_data',args=querry))
    user_data=fire_User.objects.get(pk=pk)
    email=user_data.email
    user_uid=auth.get_user_by_email(email=email).uid
    #we will get the data fromthe requested uid
    # user ref from the uid
    users_ref = db.collection("user-cards").document(user_uid).collection('user-id-cards')
    
    # Watch the document
    doc_watch = users_ref.on_snapshot(on_snapshot)

    return render(request,"id_card/part_fire_user_data.html",{
        "user_data":user_data_fire_new,
        'current_user_id':pk
    })




@login_required(login_url='login')
def cards_generated(request,pk):
        
        get_no_of_cards=generated_canvas.objects.all().filter(current_user=pk).values()
        return render(request,"id_card/generated_cards.html",{
            'cards_generated':len(get_no_of_cards),
            'cards_generated_len':get_no_of_cards
        })            


@login_required(login_url='login')
def dashboard(request,pk):

    return render(request,"id_card/admin_dashboard.html",{
        "user_data":user_data_fire_new,
        'client_id':pk
    })
    



# class dashboard_vi(View):    
#     @method_decorator(login_required(login_url='login'))
#     def get(self,request,pk):
#       global val11 
#       def val11():
#             return pk
  
#       return render(request,"id_card/admin_dashboard.html",{
#         "user_data":user_data_fire_new,
#         'client_id':pk
#          })

    


