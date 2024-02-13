from django.db import models

# Create your models here.

class fire_User(models.Model):
   full_name=models.CharField(max_length=100)
   email=models.CharField(max_length=164)
   bussines_name=models.CharField(max_length=200)
   adress=models.CharField(max_length=200)
   phone_No=models.IntegerField()  
   def __str__(self):

      return f"{self.full_name} ,{self.email} ,{self.bussines_name} ,{self.adress} ,{self.phone_No}" 
    
class canvas_data(models.Model):
   current_user_id=models.CharField(max_length=200)
   object_length=models.IntegerField()   
   object_fields=models.CharField(max_length=600)
   object_rank_location=models.CharField(max_length=600,default=None)
   canvas_adress=models.FileField(upload_to="base_desgin",null=True,default=None)   
    


class generated_canvas(models.Model): 
   current_user=models.IntegerField()
   pdf_adress=models.FileField(upload_to="generated/output",null=True,default=None)   
   


