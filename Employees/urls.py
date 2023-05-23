
from django.urls import path 
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('index', views.main,name="index"),
    path('login',views.auth,name="login"),
    path('logout',views.end_session,name="logout"),
    path('Employees/Add-User/',views.add),
    path("Employees/table",views.table),
    path('Dashboard/',views.dashboard,name="admin"),
    path('Employees/Edit-User/<int:id>/',views.edit),
    path('Employees/Submit-Vacation/<int:id>/',views.submit),
    path('Employees/Submitted-Vacations',views.vacation)

]


