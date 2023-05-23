from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from .models import Employee
from .models import DEPARTMENT_CHOICES
from .models import Vacancy;
from json import dumps
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , login , logout
#from .models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
import json

# Create your views here 
@ensure_csrf_cookie

@login_required(login_url="login")
def table(request):
    data = Employee.objects.all().values()
    if(data.count()>0):
     return render(request,"search.html",{"data" : Employee.objects.all().values()})
    else:
      return render(request,"search.html")

@login_required(login_url="login")
def add(request):
    if request.method=="POST":
     y=request.body
     obj=json.loads(y)
     employee = Employee(fname=obj.get("fname"),lname=obj.get("lname"),salary=obj.get("salary"),Department=obj.get("dep_index"),email=obj.get("email"),phone=obj.get("phone"),vac_available=obj.get("vac_available"),gender=obj.get("gender"),status=obj.get("status"),address=obj.get("address"),birth=obj.get("birth"),index=obj.get("dep_index"))
     print(employee.index)
     employee.save()
    return render(request,"Add_User.html")



def auth(request):
  if request.method=="POST":
    username1=request.POST.get("username")
    password1=request.POST.get("password")
    print(username1)
    user = authenticate(request, username=username1 , password=password1)
    if( user is not None ):
      print("yeah")
      login(request,user)
      return redirect('Dashboard')
    else:
      print("nope")
      return HttpResponse("noo")
  else: 
   return render(request,"Authenticate.html")
  
@login_required(login_url="login")  
def dashboard(request):
 current_e_number = Employee.objects.count()
 if(current_e_number > 0):
    hired_e = Employee.objects.all()[current_e_number-1].id
    print(hired_e)
 else:
    hired_e=0

 current_v_number = Vacancy.objects.count()
 if (current_v_number > 0) :
    s_vacations = Vacancy.objects.all()[current_v_number-1].id
 else:
   s_vacations=0
 
 return render(request,"Dashboard.html",{"hired":hired_e,"current_e":current_e_number,"submitted":s_vacations,"current_v":current_v_number})

@login_required(login_url="login")
def edit(request,id):
 if request.method=="GET" :
   obj = Employee.objects.values().filter(id=id)
   return render(request,'Edit_User.html',{"data":obj[0]})
 elif request.method=="POST":
   obj = Employee.objects.filter(id=id)[0]
   y=request.body
   new_one = json.loads(y)
   obj.fname=new_one.get("fname") 
   obj.lname=new_one.get("lname")
   obj.salary=new_one.get("salary")
   obj.Department = new_one.get("dep_index")
   obj.status=new_one.get("status")
   obj.email=new_one.get("email")
   obj.phone=new_one.get("phone")
   obj.address=new_one.get("address")
   obj.vac_available=new_one.get("vac_available")
   obj.index=new_one.get("dep_index")
   obj.save()
   return HttpResponse("Success")
 elif request.method == "DELETE" :
   obj = Employee.objects.filter(id=id)[0]
   print(obj)
   obj.delete()
   return HttpResponse("success")
 
@login_required(login_url="login")
def submit(request,id):
     if request.method=="GET":
      employee = Employee.objects.values().filter(id=id)[0]
      return render(request,"Vacancy.html",{"data":employee})
     elif request.method=="POST":
       y = request.body
       obj = json.loads(y)
       employee = Employee.objects.all().filter(id=id)[0]
       vac = Vacancy(start=obj.get("start"),end=obj.get("end"),rest=obj.get("rest"),reason=obj.get("reason"),employee_id=employee)
       vac.save()
       return HttpResponse("success submitted")
  

def main(request):
    c = {}
    if request.method=="POST" :
     y = request.body
     y=json.loads(y)
     print(y.get("name"))
    return render(request , "base.html")

@login_required(login_url="login")
def vacation(request) :
  if request.method=="GET":
    return render(request,"Submitted.html",{"data":Vacancy.objects.all()})
  elif request.method=="PUT":
    y = request.body
    req=json.loads(y)
    obj = Vacancy.objects.filter(id=req.get("id"))[0]
    employee = Employee.objects.filter(id=obj.employee_id.id)[0]
    if employee.vac_available - obj.rest >=0 :
      employee.vac_available -= obj.rest 
      obj.status=True
    else :
      obj.status=False
    obj.save()
    employee.save()
    return HttpResponse("Success")
  
  elif request.method=="DELETE":
    y=request.body
    req=json.loads(y)
    obj = Vacancy.objects.filter(id=req.get("id"))[0]
    obj.delete()
    return HttpResponse("Success")

def end_session(request):
  logout(request)
  return redirect("/login")



      

