from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from ..models import Organization, Rating
from ..serializers import OrganizationSerializer, RatingSerializer


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