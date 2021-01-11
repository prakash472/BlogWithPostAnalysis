from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.parsers import JSONParser
from .serializers import PostSerializer, CategoriesSerializer, PostCategorySerializer, AuthorSerializer
from .models import DemoPost, Categories
from users.models import NewUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser


class CreatePostUserPermission(BasePermission):
    message = "Editing posts is restricted to the author of the post only."

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


class AuthorPostList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PostCategorySerializer
    lookup_url_kwarg = "pk"

    def get_queryset(self):
        pk = self.kwargs.get(self.lookup_url_kwarg)
        trendingPosts = DemoPost.objects.filter(author=pk)
        return trendingPosts


class PostList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        posts = DemoPost.objects.all()
        serializer = PostCategorySerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostSearch(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = DemoPost.objects.all()
    serializer_class = PostCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["^slug"]


class CreatePost(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""
    def get_object(self, pk):
        try:
            user_post = DemoPost.objects.filter(author=pk)
            return user_post
        except DemoPost.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user_post = self.get_object(pk)
        serializer = PostCategorySerializer(user_post, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 """


class UserPostDetail(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = PostCategorySerializer
    queryset = DemoPost.objects.all()


class EditPost(generics.UpdateAPIView):
  #  permission_classes = [permissions.IsAuthenticated]

    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    queryset = DemoPost.objects.all()

    """
    def get_queryset(self):
        user = self.request.user
        return DemoPost.objects.filter(author=user)
    """


class DeletePost(generics.RetrieveDestroyAPIView):
  #  permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    queryset = DemoPost.objects.all()


"""
    def get_queryset(self):
        user = self.request.user
        return DemoPost.objects.filter(author=user) """


class CategoryList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class TrendingPostList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PostCategorySerializer

    def get_queryset(self):
        trendingPosts = DemoPost.objects.all()
        if len(trendingPosts) >= 12:
            return DemoPost.objects.order_by('-date_posted')[:12]
        return trendingPosts


class FilteredPostList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PostCategorySerializer

    def get_queryset(self):
        trendingPosts = DemoPost.objects.all().order_by('-review_positive')
        if len(trendingPosts) >= 12:
            return DemoPost.objects.order_by('-review_positive')[:12]
        return trendingPosts


""" class checkPostList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PostCategorySerializer
    lookup_url_kwarg = "pk"

    def get_queryset(self):
        pk = self.kwargs.get(self.lookup_url_kwarg)
        trendingPosts = DemoPost.objects.filter(author=pk)
        return trendingPosts
 """


class AuthenticatedUserDetails(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = AuthorSerializer
    lookup_url_kwarg = "pk"

    def get_queryset(self):
        pk = self.kwargs.get(self.lookup_url_kwarg)
        users = NewUser.objects.filter(id=pk)
        return users
