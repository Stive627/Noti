from .models import User

def delete_user():
    first_user = User.objects.filter(id=10)
    first_user1 = User.objects.filter(id = 11)
    first_user2 = User.objects.filter(id = 12)
    first_user.delete()
    first_user1.delete()
    first_user2.delete()
    return 'User deleted'
