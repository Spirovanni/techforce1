from passlib.hash import django_pbkdf2_sha256 as handler
import time
from Crypto.Cipher import AES
from Crypto import Random
import json
import hashlib
from django.conf import settings
from ..email import BaseEmailClient
from ..models import User, UserSettings

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import Organization, Rating
from ..serializers import OrganizationSerializer, RatingSerializer

encryptor = None


def __get_aes_obj():
    global encryptor
    if not encryptor:
        encryptor = AESCipher(settings.CONFIG['PASSWORD_RECOVERY_SECRET'])
    return encryptor


def get_user_by_email(email):
    if not email:
        raise Exception('No user email provided.')
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        user = None

    return user


def get_user_by_id(id):
    if not id:
        raise Exception('No user id provided.')

    return User.objects.get(id=id)


def get_user_settings_by_id(id):
    if not id:
        raise Exception('No user id provided.')

    return UserSettings.objects.get(id=id)


def check_password(user, password):
    return handler.verify(password, user.password) if user else False


@action(detail=True, methods=['POST'])
def rate_organization(self, request, pk=None):
    if 'stars' in request.data:

        organization = Organization.objects.get(id=pk)
        stars = request.data['stars']
        # user = request.user
        user = User.objects.get(id=1)
        print('user', user.username)

        try:
            rating = Rating.objects.get(user=user.id, organization=organization.id)
            rating.stars = stars
            rating.save()
            serializer = RatingSerializer(rating, many=False)
            response = {'message': 'Rating updated!', 'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)

        except:
            rating = Rating.objects.create(user=user, organization=organization, stars=stars)
            serializer = RatingSerializer(rating, many=False)
            response = {'message': 'Rating created!', 'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)

    else:
        response = {'message': 'You need to provide stars'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)