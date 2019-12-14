from django.shortcuts import render
from rest_framework import viewsets
from ..models import Organization, Rating
from ..serializers import OrganizationSerializer, RatingSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
