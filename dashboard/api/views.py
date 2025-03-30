from rest_framework import viewsets, filters
from rest_framework.response import Response
from api.models import DataEntry
from api.serializers import DataEntrySerializer

class DataEntryViewSet(viewsets.ModelViewSet):
    queryset = DataEntry.objects.all()
    serializer_class = DataEntrySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['country', 'region', 'topic', 'sector', 'source']

    def get_queryset(self):
        queryset = DataEntry.objects.all()
        topic = self.request.query_params.get('topic')
        region = self.request.query_params.get('region')
        if topic:
            queryset = queryset.filter(topic=topic)
        if region:
            queryset = queryset.filter(region=region)
        return queryset
