from rest_framework import serializers
from api.models import DataEntry

class DataEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DataEntry
        fields = '__all__'
