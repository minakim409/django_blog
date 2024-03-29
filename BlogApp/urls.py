from django.urls import path
import BlogApp.views as views

# from accounts.views import hello_world

urlpatterns = [
    ### Add urls in view.py here
    path('posts/', views.post_list),
    path('posts/<int:pk>', views.post_detail),
    path('comments/', views.comment_list),
    path('comments/<int:pk>/', views.comment_detail),
    path('post_comments/', views.comments_by_post_id),
    path('posts/like/<int:pk>/', views.post_like, name='post_like'),
    # path('comments/frompost/', views.comment_from_post),

    # path('comments/<int:pk>/put_delete/', views.comment_put_delete),
    
    # path('logout/', views.logout),
    
]