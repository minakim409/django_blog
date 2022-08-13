from django.contrib import admin
from .models import Post, Comment, PostImage, PostLike
# Register your models here.
admin.site.register(Post)
admin.site.register(PostImage)
admin.site.register(PostLike)
admin.site.register(Comment)
