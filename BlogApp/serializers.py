from xml.etree.ElementTree import Comment

# from requests import post
# from requests import post
from .models import Post, Comment, PostImage, PostLike
from rest_framework import serializers
from authentication.serializers import UserSerializer


class PostImageSerializer(serializers.ModelSerializer):
   image = serializers.ImageField(use_url=True)
    
   class Meta:
      model = PostImage
      fields = ['image']


class PostSerializer(serializers.ModelSerializer):
    # images = PostImageSerializer(many=True, read_only=True)

    images = serializers.SerializerMethodField() #원래 모델에 없는 필드인데, 특정 필드를 내려주고 싶을떄 쓰는 것임 I mean to add to JSON
    #https://eunjin3786.tistory.com/268
    

    # author = UserSerializer()#read only 는 여기서 user 자료를 고치고 싶지 않을때 쓰이는듯.
    # read only 추가하니 post create 할때 django.db.utils.IntegrityError: NOT NULL constraint failed: BlogApp_post.author_id 에러 뜸. 왜일까
    #이 항을 아예 없으면 frontend 자료에서 작가가 안뜨는 현상 발생


    def get_images(self, obj):
        # image = obj.postimage_set.all()
        image = obj.image.all()
        return PostImageSerializer(instance=image, many=True).data

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author','created_at', 'images', 'like_users']
        
        # depth = 1
    # def create(self, validated_data):
    #    images_data = self.context['request'].FILES
    #    post = Post.objects.create(**validated_data)
    #    for image_data in images_data.getlist('image'):
    #        PostImage.objects.create(post=post, image=image_data)
    #    return post

    def create(self, validated_data):

        del validated_data['like_users']
        print('request: ', self.context['request'])
        print('FILES: ', self.context['request'].FILES)
        print('validated_data: ', validated_data)
        # print('.content: ', self.context['request'].content)
        # print('.images: ', self.context['request'].images)
        # print('getList: ', image_set.getlist('images'))

        instance = Post.objects.create(**validated_data)
        image_set = self.context['request'].FILES
        for image_data in image_set.getlist('images'):
            print('image_data: ', image_data)
            PostImage.objects.create(post = instance, image=image_data)
        # print('instace: ', instance.data)
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['author_username'] = instance.author.username,
        representation['like_users_count'] = instance.like_users.count() 
        representation.pop('author')
        representation.pop('like_users')
        # print(representation)
        return representation

    #https://dev.to/abdenasser/my-personal-django-rest-framework-serializer-notes-2i22
    #https://stackoverflow.com/questions/37985581/how-to-dynamically-remove-fields-from-serializer-output
    

    #중첩 serializer는    
    #bc when you post sth, you don't want all User data, but when you receive data. You want user's id to show.
    # def to_representation(self, instance):
    #     return {
    #         "id": instance.id,
    #         "title": instance.title,
    #         "content": instance.content,
    #         # "author": UserSerializer(instance.author).data,
    #         "author":instance.author.username,
    #         "created_at": instance.created_at,
    #         'like_users': instance.like_users.count(),
    #         # 'like_users': instance.like_users,
    #         "images": instance.images
    #         # "images": PostImageSerializer.data,
    #     }

    





# class PostAllSerializer(serializers.ModelSerializer):
#     images = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

#     class Meta:
#         model = Post
#         fields = ['id', 'title', 'content', 'author', 'images', 'created_at']

#     #bc when you post sth, you don't want all User data, but when you receive data. You want user's id to show.
#     def to_representation(self, instance):
#         return {
#             "id": instance.id,
#             "title": instance.title,
#             "content": instance.content,
#             "author": UserSerializer(instance.author).data,
#             # "images" : instance.images.url,
#             "created_at": instance.created_at,
#         }

    

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'content', 'author', 'created_at', 'reply_to']

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "post": PostSerializer(instance.post).data,
            "content": instance.content,
            "author": UserSerializer(instance.author).data,
            "created_at": instance.created_at,
            "reply_to": instance.reply_to,
        }



# class PostLikeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PostLike
#         fields = '__all__'

#     def to_representation(self, instance):
#         return {
#             "id": instance.id,
#             "post": PostSerializer(instance.post).data,
#             "content": instance.content,
#             "author": UserSerializer(instance.author).data,
#             "created_at": instance.created_at,
#             "reply_to": instance.reply_to,
#         }

