from django.db import models

# def images(instance, filename):
#     return '/'.join([])


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    # img = models.ImageField(upload_to='images/')
    # images = models.ImageField(blank=True, upload_to="images/", null=True, default = "images/default.jpg")
    created_at = models.DateTimeField(auto_now=True)

    like_users = models.ManyToManyField('authentication.CustomUser', related_name='like_articles', blank=True)
    

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-created_at', )

    # @property
    # def like_count(self):
    #     return self.like_set.count()

    
    # def get_images(self):
    #     if self.images:
    #         return self.images.url
    #     else:
    #         return 'your_default_img_url_path'


#    image = models.ImageField(blank=True, upload_to="images/", null=True, default = "images/default.jpg")

class PostImage(models.Model):
   post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name= 'image')
   image = models.FileField(upload_to="images/")
#    image = models.ImageField(blank=True, upload_to="images/", null=True)

class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name= 'post_like')
    user = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE)

    class Meta:
	    unique_together = (("post", "user"),)



class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE)
    content = models.TextField()
    post = models.ForeignKey(Post, null=True, blank=True, on_delete=models.CASCADE, related_name = 'PostForComment')
    created_at = models.DateTimeField(auto_now=True)
    reply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name='replies')

    class Meta:
        ordering = ('-created_at', )



