from rest_framework import serializers
from .models import Gym, Client, Payment
from django.contrib.auth.models import User
import re


class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gym
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        exclude = ['gym']
    
    def validate_phone(self, value):
        if not re.fullmatch(r"\d{10}", value):
            raise serializers.ValidationError(
                "Phone Number must contain exactly 10 Digits!"
            )
        return value

    def validate_height(self, value):
        if value <=0:
            raise serializers.ValidationError(
                "Height must be greater than 0!"
            )
        return value

    def validate_weight(self, value):
        if value <=0:
            raise serializers.ValidationError(
                "Weight must be greater than 0!"
            )
        return value

    def validate(self, data):
        if data["membership_end"]<data["membership_start"]:
            raise serializers.ValidationError({
                "membership_end":
                "Membership end date must be after the membership start date!"
            })
        return data


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
    
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Amount must be greater than zero."
            )
        return value

    def validate_months_paid(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Months paid must be greater than zero."
            )
        return value


class RegisterSerializer(serializers.Serializer):
    gym_name = serializers.CharField(max_length=100)
    owner_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=15)
    address = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        gym = Gym.objects.create(
            user=user,
            gym_name=validated_data['gym_name'],
            owner_name=validated_data['owner_name'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            address=validated_data['address']
        )

        return gym

