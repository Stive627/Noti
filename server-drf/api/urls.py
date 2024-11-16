from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views


urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('upload/', views.ImageView.as_view(), name='upload'),
    path('addtask/', views.CRUDTaskView.as_view(), name='create_task'),
    path("profile/", views.ProfileView.as_view(), name='profile'),
    path('crudtask/<int:pk>/', views.CRUDTaskView.as_view(), name='crud_task'),
    path('done/<int:pk>/', views.DoneTaskView.as_view(), name='done')
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
