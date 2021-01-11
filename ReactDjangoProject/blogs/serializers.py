from rest_framework import serializers
from .models import DemoPost, Categories
from rest_framework.serializers import PrimaryKeyRelatedField
from users.serializers import CustomUserSerializer
from users.models import NewUser


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ["id", "name"]


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ["id", "username"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = DemoPost
        fields = ["id", "title", "content", "date_posted", "excerpt", "slug",
                  "review_positive", "image", "author", "categories"]


class PostCategorySerializer(serializers.ModelSerializer):
    categories = CategoriesSerializer(many=True)
    author = AuthorSerializer()

    class Meta:
        model = DemoPost
        fields = ["id", "title", "content", "date_posted", "excerpt", "slug",
                  "review_positive", "image", "author", "categories"]
