from rest_framework import serializers
from id_card.models import canvas_data,generated_canvas


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=canvas_data
        fields='__all__'



class ItemSerializer1(serializers.ModelSerializer):
    class Meta:
        model=generated_canvas
        fields='__all__'
