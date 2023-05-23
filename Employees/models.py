from django.db import models

# Create your models here.
GENDER_CHOICES = (
   ('Male','Male'),
   ('Female','Female')
)

RELATIONS_CHOICES = (
   ('Single','Single'),
   ('Married','Married')
)

DEPARTMENT_CHOICES = (
   (0,"Public Safety and emergency services"),
   (1,"Student Affairs and services"),
   (2,"Academic Staff"),
   (3,"Financial Affairs"),
   (4,"Human Resources"),

)



    
class Employee(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    address = models.CharField(max_length=100,default="ff")
    phone = models.PositiveBigIntegerField()
    vac_available = models.PositiveBigIntegerField(default=5)
    salary = models.PositiveBigIntegerField(default=3500)
    birth = models.DateField(default="1999-01-17")
    gender = models.CharField(choices=GENDER_CHOICES,max_length=50,null=True,default='Female')
    status= models.CharField(choices=RELATIONS_CHOICES,max_length=50,null=True,default='Single')
    Department= models.CharField(choices=DEPARTMENT_CHOICES , max_length=50 ,default=3)
    index=models.IntegerField(default=0)
    def __str__(self) :

      return self.fname
    



   
class Vacancy(models.Model):
    employee_id = models.ForeignKey(Employee,on_delete=models.CASCADE,default=8)
    start = models.DateField(default="1999-01-17")
    end   =  models.DateField(default="1999-01-17") 
    reason = models.TextField(default=" ")
    rest = models.PositiveIntegerField(default=0)
    status = models.BooleanField(default=False)



