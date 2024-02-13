from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import uuid
from id_card.models import canvas_data
from django.core.management.base import BaseCommand
from  django.core.files.base import ContentFile
from .serializers import ItemSerializer,ItemSerializer1
from chrops_id.settings import BASE_DIR
import os
from django.contrib.auth.models import User
import threading
from firebase_admin import credentials,auth
from firebase_admin import firestore
import firebase_admin
from id_card.models import fire_User,generated_canvas
import itertools



#created objectrank location in the models to track where to put the incoming objects in the json file

# variable to hold the fields for the app

field_attribute=[]
object_length=0
user_data_firestore_new=[]
elementRankName=[]



if not firebase_admin._apps:
    cred = credentials.Certificate('id_card/key_file/chropsicard-1285575e1473.json')
    app = firebase_admin.initialize_app(cred)




db = firestore.client()



callback_done = threading.Event()
# Create a callback on_snapshot function to capture changes

def on_snapshot(doc_snapshot, changes, read_time):
    user_data_firestore_new.clear()
    for doc in doc_snapshot:
        user_data_firestore_new.append(doc.to_dict())
    callback_done.set()





@api_view(['GET', 'POST'])
def getRoutes(request):

    current_requesting_user=0

    if request.method == 'GET':
      
      
      if(request.headers.__contains__('Referer')==True):
            current_requesting_user=int(request.headers['Referer'].split('/')[4])
            print(current_requesting_user)    
            get_data_item_filtered=canvas_data.objects.all().filter(current_user_id=current_requesting_user).values()[0]['canvas_adress'] 
      
            file_to_open=os.path.join(BASE_DIR,f"media/{get_data_item_filtered}")
            with open(file_to_open) as file: 
              data_file = file.read()
            
                # print(get_data_item_filtered)
            get_data_item=canvas_data.objects.all()   
            serializer=ItemSerializer(get_data_item,many=True)
            return Response(data_file)
      else:
            get_data_item=canvas_data.objects.all()   
            serializer=ItemSerializer(get_data_item,many=True)
            return Response(serializer.data)
               



    elif request.method == 'POST':
       


  
        #first we will check if the data with this user already exist if yes then update previous record if no create a new one
      if(request.headers.__contains__('M-method')==True):
                   
            current_requesting_user=int(request.headers['Referer'].split('/')[4])
            #print(current_requesting_user)
            #collect data from  firstore databse
            user_data=fire_User.objects.get(pk=current_requesting_user)
            email=user_data.email
            user_uid=auth.get_user_by_email(email=email).uid
            
              #we will get the data fromthe requested uid
              # user ref from the uid
            users_ref = db.collection("user-cards").document(user_uid).collection('user-id-cards')
              # Watch the document
            doc_watch = users_ref.on_snapshot(on_snapshot)
        
            data= request.data


            ## data for current requesting user
            get_ranklocation_data=canvas_data.objects.all().filter(current_user_id=current_requesting_user).values()[0]['object_rank_location']
            res=get_ranklocation_data.replace('[','')
            res_again=res.replace(']','')
            new_res=res_again.split(',')
            
            
            mylist=[]
            mystr=''
            for datas in range(len(new_res)):
                newstr=mystr.strip()
                jkl=new_res[datas]
                hbj=jkl.strip()
                for i in range(1,len(hbj)-1):
                    newstr=newstr+hbj[i]
                mylist.append(newstr)
                newstr=''


            ##here card creation code will be generated
            card_list=[]
            
              ##getting the current base design
            get_data_item_filtered=canvas_data.objects.all().filter(current_user_id=current_requesting_user).values()[0]['canvas_adress'] 
            file_to_open=os.path.join(BASE_DIR,f"media/{get_data_item_filtered}")
           
           
            with open(file_to_open,'r') as json_file: 
                data_file1 = json.load(json_file)





            convter_json=data_file1           
           # print(convter_json['objects'][0]['text'])  
            
              ##this is iterator over the firebase data
            get_data_forpdf=generated_canvas.objects.all().filter(current_user=current_requesting_user).values()  
            lenght_data_firebase=len(user_data_firestore_new)
            lenght_data_api_pdf=len(get_data_forpdf)
            print(lenght_data_api_pdf)
            print(lenght_data_firebase)
            if lenght_data_firebase>lenght_data_api_pdf:  
              for i in range(len(user_data_firestore_new)):  
                      combined_string=''
                      for data in range(len(mylist)): 
                          rangep=mylist[data].split(':')[1]
                          string_new=convter_json['objects'][int(rangep)]['text'].split(':')[0]
                          string_firebase=user_data_firestore_new[i][mylist[data].split(':')[0]]                     
                          combined_string=string_new+' : '+string_firebase.title()
                          convter_json['objects'][int(rangep)]['text']=combined_string
                          ##this is the value to be inserte into the file
        #                  print(convter_json['objects'][int(rangep)]['text'])
                        # print(combined_string)
                      id = uuid.uuid4() 
                      unique_name11=str(id)+'.json'
                      
                      res_id=json.dumps(convter_json)
                      content_fle_id=ContentFile(res_id,name=unique_name11)
                      print(content_fle_id)
                      instance_method_new =generated_canvas(current_user=current_requesting_user,pdf_adress=content_fle_id)
                      instance_method_new.save()
            
              
              #  print("jjnsdnkscnjncksnck")
             #   return Response("found a method to work with", status=status.HTTP_201_CREATED)
                
            else :          
              
              return Response("NO new Data Available", status=status.HTTP_201_CREATED)               
      
      
      
            return Response(user_data_firestore_new, status=status.HTTP_201_CREATED)
      
 
      elif (request.headers.__contains__('GML-method')==True) : 
                    get_current_user_pdf=int(request.headers['Referer'].split('/')[4])
                    get_data_fromdb_forpdf=generated_canvas.objects.all().filter(current_user=get_current_user_pdf).values()  
                    get_data_fromdb_forpdf1=generated_canvas.objects.all() 
                    print(get_data_fromdb_forpdf1)  
                    serializer1=ItemSerializer1(get_data_fromdb_forpdf1,many=True)
                    return Response(serializer1.data, status=status.HTTP_201_CREATED)  
          
      else :
                      
              data=request.data
              hel=json.loads(data)
                        
            #getting only the created user
            # 
            #  
            
              get_user_id_from_req=hel['current_user_id']
              User_created_user=User.objects.all().filter(id=int(get_user_id_from_req)).values()
              if not User_created_user:
                return Response("Can't create User", status=status.HTTP_201_CREATED)
              else :    
                                
                #print(User_created_user)
                get_database_instance_01=canvas_data.objects.all().filter(current_user_id=get_user_id_from_req).values()
                # print(get_database_instance_01)        
                print(get_database_instance_01)

                if not get_database_instance_01 :

                  id = uuid.uuid4() 
                  unique_name=str(id)+'.json'
                    # print(str(id)+'.json')           
                  content_file=ContentFile(data,name=unique_name)
                  elementRank=0

                    # print(hel['current_user_id'])
                  for objects in hel['objects']:
                    if objects['type']=='i-text': 
                      field_attribute.append(objects['text'].split(':')[0])
                      elementRankName.append(objects['text'].split(':')[0].lower().strip().replace(' ','_')+':'+f'{elementRank}')
                        # elementRankName(values=elementRank)
                      elementRank=elementRank+1
                
                     # print(field_attribute)          #print(objects['text'].split(':')[0])
                          
                      
                  object_length=len(field_attribute)
                  instance= canvas_data(object_rank_location=elementRankName,canvas_adress=content_file,object_length=object_length,object_fields=field_attribute,current_user_id=hel['current_user_id'])
                  instance.save()
                  field_attribute.clear()
                  elementRank=0
                  elementRankName.clear()
                  object_length=0
                else:
                  #getting the previous file adress
                  file_adressprev=canvas_data.objects.all().filter(current_user_id=get_user_id_from_req).values()[0]
                  file_to_open_post=os.path.join(BASE_DIR,f"media/{file_adressprev['canvas_adress']}")
                  #print(file_to_open_post)
                  id = uuid.uuid4() 
                  unique_name=str(id)+'.json'
                  content_file=ContentFile(data,name=unique_name) 
                  elementRank=0
                  elementRankNameRel=dict()
                  for objects in hel['objects']:
                      if objects['type']=='i-text': 
                        field_attribute.append(objects['text'].split(':')[0])
                        elementRankName.append(objects['text'].split(':')[0].lower().strip().replace(' ','_')+':'+f'{elementRank}')
                        # elementRankName(values=elementRank)
                        elementRank=elementRank+1
                  os.remove(file_to_open_post)
                  object_length=len(field_attribute) 
                  get_data_to_update=canvas_data.objects.all().get(current_user_id=get_user_id_from_req)
                  get_data_to_update.object_length=object_length
                  get_data_to_update.object_fields=field_attribute
                  get_data_to_update.current_user_id=hel['current_user_id']
                  get_data_to_update.canvas_adress=content_file
                  get_data_to_update.object_rank_location=elementRankName
                  get_data_to_update.save()
                  field_attribute.clear()
                  elementRankName.clear()
                  elementRank=0
                  object_length=0 
                return Response(data, status=status.HTTP_201_CREATED)
            