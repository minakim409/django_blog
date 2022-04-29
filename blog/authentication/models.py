from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, username, realname, password=None):
        if not username:
            raise ValueError("User must have an username")
        if not password:
            raise ValueError("User must have a password")
        if not realname:
            raise ValueError("User must have a name")

        user = self.model(
            username = username,
            realname = realname,
        )
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.is_staff = False
        user.save(using=self._db)
        return user

    def create_superuser(self, username, realname, password=None):
        if not username:
            raise ValueError("User must have an username")
        if not password:
            raise ValueError("User must have a password")
        if not realname:
            raise ValueError("User must have a name")

        user = self.model(
            username = username,
            realname = realname,
        )
        user.set_password(password)  # change password to hash
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user
        

    def create_staffuser(self, username, realname, password=None):
        if not username:
            raise ValueError("User must have an username")
        if not password:
            raise ValueError("User must have a password")
        if not realname:
            raise ValueError("User must have a name")

        user = self.model(
            username = username,
            realname = realname,
        )
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(default='', max_length=100, null=False, blank=False, unique=True)
    realname = models.CharField(default='', max_length=100, null=False, blank=False)
    status = models.BooleanField(default= False)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # a admin user; non super-user
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['realname']

    objects = CustomUserManager()

    @staticmethod
    def has_perm(perm, obj=None):
        # "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    @staticmethod
    def has_module_perms(app_label):
        # "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    def __str__(self):
        return self.username