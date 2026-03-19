# Create your views here.
from rest_framework import generics
from .models import Category, Task
from .serializers import CategorySerializer, TaskSerializer


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.select_related("category").all().order_by("-created_at")
        category_id = self.request.query_params.get("category_id")

        if category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.select_related("category").all()
    serializer_class = TaskSerializer