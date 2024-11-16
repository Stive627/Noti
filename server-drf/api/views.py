from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer, ImageSerializer, TaskSerializer, DoneSerializer
from django.core.exceptions import ObjectDoesNotExist
from .models import User, Task
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from django.http import HttpResponse

# Create your views here.

# Sending mail

def sendMail(request, subject, message, recipient):
    try:
        send_mail(
            subject= subject, 
            message= message,
            from_email= settings.EMAIL_HOST_USER,
            recipient_list= [recipient], 
            fail_silently=False)
        return HttpResponse('The email is sent successfully.')
    except BadHeaderError:
        return HttpResponse('Invalid header found.')



# Register view
class RegisterView(APIView):
    serializer_class = RegisterSerializer
    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            sendMail( request=request, subject='Welcome to Noti', message='Noti is your app for time management with AI features. Noti is a cutting-edge tracking system to help you optimize your time througout your day to achieve your expected goals.',  recipient=request.data.get('email'))
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
      

#Login view
class LoginView(APIView):
    serializer_class = LoginSerializer
    def post(self, request):
        usernameOrEmail = request.data.get('usernameOrEmail')
        password = request.data.get('password')
        user = None
        try:
            user = User.objects.get(Q(Q(username = usernameOrEmail) | Q(email = usernameOrEmail)) ^ Q(password = password))
        except User.DoesNotExist:
            pass
        if not user:
            user = authenticate(username = usernameOrEmail , password = password)
        if user:
            tokens, _ = Token.objects.get_or_create(user = user)
            return Response({'token':tokens.key, 'id':Token.objects.get(key = tokens).user.id , 'profile':ProfileSerializer(user).data}, status=status.HTTP_200_OK)
        return Response({'message':'invalid credentials'},  status = status.HTTP_401_UNAUTHORIZED)
    
#Logout view
class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated,]
    def post(self, request):
        try:
            request.auth.delete()
            return Response({'message':'successfully logged out'})
        except Exception as e:
            return Response({'error':str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

#Crud task view        
class CRUDTaskView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            task = Task.objects.get(id=pk)
        except Task.DoesNotExist:
            return Response(status.HTTP_404_NOT_FOUND)
        if task:
            task.delete()
            return Response({'message':'sucessfully deleted'})
        
    def put(self, request, pk):
        task = Task.objects.get(id=pk)
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid():
            serializer.update(instance=task, validated_data=request.data)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, pk):
        task = Task.objects.get(id = pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data, status.HTTP_200_OK)

#Upload profile image.
class ImageView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    parser_classes = [FormParser, MultiPartParser]
    def post(self, request, format=None):
        serializer = ImageSerializer(data = request.data, instance = request.user)
        if serializer.is_valid():
            serializer.valid()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,  status=status.HTTP_400_BAD_REQUEST)
    

#Profile view
class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer
    def get(self, request):
        user = User.objects.get(pk = request.user.pk)
        serializer = self.serializer_class(user)
        return Response(serializer.data)
    
# Set the status of a task to completed.   

class DoneTaskView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DoneSerializer
    def put(self, request, pk):
        instance = Task.objects.get(id = pk)
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.update(instance, validated_data = request.data)
            return Response({'message':'Task done is set sucessfully'}, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
           