from django.urls import path
from .views import PostList, PostSearch, CreatePost, EditPost, UserPostDetail, DeletePost, CategoryList, TrendingPostList, AuthorPostList, FilteredPostList, AuthenticatedUserDetails
urlpatterns = [
    path('posts/', PostList.as_view()),
    path('search/', PostSearch.as_view()),
    path('customuser/create/', CreatePost.as_view(), name="create_post"),
    path('customuser/posts/details/<int:pk>/',
         UserPostDetail.as_view(), name="user_post_detail"),
    path('customuser/edit/posts/<int:pk>/',
         EditPost.as_view(), name="user_post_detail"),
    path('customuser/delete/posts/<int:pk>',
         DeletePost.as_view(), name="delete_post"),
    path('categories/', CategoryList.as_view()),
    path('recent/posts/', TrendingPostList.as_view()),
    path('author/posts/<int:pk>', AuthorPostList.as_view()),
    path('recent/posts/filtered/', FilteredPostList.as_view()),
    #     path('check/posts/<int:pk>', checkPostList.as_view()),
    path('authenticated/user/details/<int:pk>',
         AuthenticatedUserDetails.as_view()),

]
