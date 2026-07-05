from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .models import Gym, Client
from .serializers import ClientSerializer
from django.shortcuts import get_object_or_404

from .models import Payment
from .serializers import PaymentSerializer

from django.db.models import Sum
from django.utils import timezone

from django.db.models import Q


class RegisterAPIView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Gym registered successfully."
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class LoginAPIView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)

        if user is None:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })

class DashboardAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        gym = Gym.objects.get(user=request.user)

        clients = Client.objects.filter(gym=gym)

        payments = Payment.objects.filter(client__gym=gym)

        today = timezone.now().date()

        total_clients = clients.count()

        active_clients = clients.filter(status=True).count()

        inactive_clients = clients.filter(status=False).count()

        total_payments = payments.count()

        total_revenue = payments.aggregate(
            total=Sum('amount')
        )['total'] or 0

        today_collection = payments.filter(
            payment_date=today
        ).aggregate(
            total=Sum('amount')
        )['total'] or 0

        expiring_memberships = clients.filter(
            membership_end__lte=today
        ).count()

        return Response({

            "total_clients": total_clients,

            "active_clients": active_clients,

            "inactive_clients": inactive_clients,

            "total_payments": total_payments,

            "total_revenue": total_revenue,

            "today_collection": today_collection,

            "expiring_memberships": expiring_memberships

        })

class ClientAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        gym = Gym.objects.get(user=request.user)
        clients = Client.objects.filter(gym=gym)

        # Search
        search = request.query_params.get("search")
        if search:
            clients = clients.filter(
                Q(full_name__icontains=search) |
                Q(phone__icontains=search)
            )

        # Gender Filter
        gender = request.query_params.get("gender")
        if gender:
            clients = clients.filter(gender__iexact=gender)

        # Membership Plan Filter
        plan = request.query_params.get("membership_plan")
        if plan:
            clients = clients.filter(membership_plan__iexact=plan)

        # Status Filter
        status_filter = request.query_params.get("status")
        if status_filter is not None:

            if status_filter.lower() == "true":
                clients = clients.filter(status=True)

            elif status_filter.lower() == "false":
                clients = clients.filter(status=False)

        serializer = ClientSerializer(clients, many=True)

        return Response(serializer.data)

    def post(self, request):

        gym = Gym.objects.get(user=request.user)

        serializer = ClientSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(gym=gym)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ClientDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):
        gym = Gym.objects.get(user=request.user)
        return get_object_or_404(Client, pk=pk, gym=gym)

    def get(self, request, pk):
        client = self.get_object(request, pk)
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def put(self, request, pk):
        client = self.get_object(request, pk)
        serializer = ClientSerializer(client, data=request.data)

        if serializer.is_valid():
            serializer.save(gym=client.gym)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        client = self.get_object(request, pk)
        client.delete()

        return Response(
            {"message": "Client deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )

class PaymentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        gym = Gym.objects.get(user=request.user)

        payments = Payment.objects.filter(client__gym=gym)

        serializer = PaymentSerializer(payments, many=True)

        return Response(serializer.data)

    def post(self, request):
        gym = Gym.objects.get(user=request.user)

        client_id = request.data.get("client")

        client = get_object_or_404(
            Client,
            id=client_id,
            gym=gym
        )

        serializer = PaymentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(client=client)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):
        gym = Gym.objects.get(user=request.user)
        return get_object_or_404(
            Payment,
            pk=pk,
            client__gym=gym
        )

    def get(self, request, pk):
        payment = self.get_object(request, pk)
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)

    def put(self, request, pk):
        payment = self.get_object(request, pk)

        client_id = request.data.get("client")

        client = get_object_or_404(
            Client,
            id=client_id,
            gym=Gym.objects.get(user=request.user)
        )

        serializer = PaymentSerializer(payment, data=request.data)

        if serializer.is_valid():
            serializer.save(client=client)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        payment = self.get_object(request, pk)
        payment.delete()

        return Response(
            {"message": "Payment deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )