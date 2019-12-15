from django.db import models
from django.conf import settings
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractBaseUser, PermissionsMixin):
    id = models.IntegerField(unique=True, primary_key=True)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=40)

    first_name = models.CharField(default='', max_length=15)
    last_name = models.CharField(default='', max_length=15)
    login = models.CharField(max_length=15)
    age = models.IntegerField()
    street = models.CharField(blank=True, max_length=255)
    city = models.CharField(blank=True, max_length=255)
    zip = models.CharField(blank=True, max_length=10)
    role = models.CharField(default='', max_length=10)

    USERNAME_FIELD = 'id'


class UserSettings(models.Model):
    id = models.OneToOneField(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE,
                              primary_key=True)
    theme = models.CharField(max_length=10)


class Organization(models.Model):
    org_name = models.CharField(default='', max_length=15)
    org_description = models.TextField(blank=True, max_length=365)

    def no_of_ratings(self):
        ratings = Rating.objects.filter(organization=self)
        return len(ratings)

    def avg_rating(self):
        sum = 0
        ratings = Rating.objects.filter(organization=self)
        for rating in ratings:
            sum += rating

        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0


class Rating(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'organization'), )
        index_together = (('user', 'organization'), )
