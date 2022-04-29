from django.db import models

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.title


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE)
    content = models.TextField()
    post = models.ForeignKey(Post, null=True, blank=True, on_delete=models.CASCADE, related_name = 'PostForComment')
    created_at = models.DateTimeField(auto_now=True)
    reply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    
