from rest_framework import serializers
from .models import Category, Task


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Le nom de la catégorie est requis")
        return value


class TaskSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        source="category",
        queryset=Category.objects.all(),
        write_only=True
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "description",
            "is_completed",
            "created_at",
            "category_id",
            "category_name",
        ]

    def validate_description(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("La description est obligatoire")
        return value