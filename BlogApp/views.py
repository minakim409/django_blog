from xml.etree.ElementTree import Comment
from django.shortcuts import render
from requests import request
from authentication.models import CustomUser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Post, Comment, PostLike, PostImage
from .serializers import PostSerializer, CommentSerializer

from authentication.funts import login_status

# from django.contrib import auth
# from django.contrib.auth.decorators import login_required

# from django.shortcuts import redirect
@api_view(['GET', 'POST'])
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
    
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        author_id = request.data['author']
        if login_status(author_id):
            serializer = PostSerializer(data = request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                serializer.save()     
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            message = {"status": "You need to login first."}
            return Response(data = message, status = status.HTTP_400_BAD_REQUEST)




@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        post = Post.objects.get(id = pk)
    except post.DoesNotExist:
        message = {"status": "Post doesn't exist."}
        return Response(data = message, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
 
        # user = CustomUser.objects.get(id = serializer.data['author'])
        # username = user.username

        # tmp = serializer.data

        # tmp['author'] = username
        # tmp['like_users'] = post.like_users.count()
        
        # print(tmp['author'])
        # print(tmp)
        

        # return Response(tmp)


        return Response(serializer.data)

    # if request.method == 'GET':
        # if post.images:
        #     serializer = PostImageSerializer(post)
        # else:
        #     serializer = PostSerializer(post)

        # return Response(serializer.data)

    author_id = post.author.id
    if login_status(author_id): 
        if request.method == 'PUT':
            serializer = PostSerializer(post, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)



#get comments by post_id 기능
@api_view(['GET', 'POST'])
def comment_list(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


    if request.method == 'POST':
        post = request.data['post'] #it will only return post id
        author_id = request.data['author']
        # comment = Comment.objects.filter(post = post, author = author_id)
        if login_status(author_id):
            serializer = CommentSerializer(data = request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()     
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            message = {"status": "You need to login first."}
            return Response(data = message, status = status.HTTP_400_BAD_REQUEST)
       

@api_view(['GET', 'PUT', 'DELETE'])
def comment_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        if Comment.objects.filter(id = pk).count() != 0:
            comment = Comment.objects.get(id = pk)
        
        else:
            # message = {"status": "There's no comment yet."}
            return Response(status=status.HTTP_404_NOT_FOUND)

    except comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    author_id = comment.author.id
    if login_status(author_id): 
        if request.method == 'PUT':
            serializer = CommentSerializer(comment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            # serializer = CommentSerializer(comment, author = author_id, data=request.data)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    else:
        message = {"status": "You need to login first."}
        return Response(data = message, status = status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def comments_by_post_id(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        comments = Comment.objects.filter(post = request.data['post_id'])
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def post_like(request, pk):
	# if 'application/json' not in request.content_type:
    #     return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        # post = Post.objects.filter(post = request.data['post_id'])
        # message = {"status": {id}}
        # return Response(data = message, status = status.HTTP_400_BAD_REQUEST)
        

        post = Post.objects.get(id = pk)
        current_user = request.user

        if current_user.is_anonymous == True:
            message = {"status": "ANONYMOUS"}
            return Response(data = message, status=status.HTTP_200_OK)

        if post.like_users.filter(id = current_user.id).exists():
            post.like_users.remove(current_user.id, data = request.data)
            # serializer = PostSerializer(p)
            # serializer.save()
            message = {"status": "NO added"}
            return Response(data = message, status=status.HTTP_400_BAD_REQUEST)
        else:
            post.like_users.add(current_user.id)
            # post.save()
            # post.save(update_fields=['like_users'])
            # serializer = PostSerializer(post, data=request.data)
            # if serializer.is_valid(raise_exception=True):
            #     serializer.save()     
            message = {"status": "Added"}
                # return Response(serializer.data, status=status.HTTP_200_OK)
            # serializer.save()
            
            return Response(data = message, status=status.HTTP_200_OK)

        # post.save(update_fields=['like_users'])

        
# user = CustomUser.objects.get(id = userid)
        
#             if login_status(userid) == True:
#                 # user = CustomUser.objects.get(id = userid)
#                 # user = CustomUser.objects.get(username = username)
#                 user.status = False
#                 user.save(update_fields=['status'])



    # return redirect('post:index')
# return redirect('accouts:login')
        # post_id = request.data['post'] #it will only return post id
#         user_id = request.data['user']
#         # comment = Comment.objects.filter(post = post, author = author_id)
#         if login_status(user_id):
#             # post = Post.objects.get(post_id= post_id)
#             # post = Post.objects.get(post_id= post_id)
#             serializer = PostLikeSerializer(data = request.data)
#             if serializer.is_valid(raise_exception=True):
#                 serializer.save()     
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#         else:
#             message = {"status": "You need to login first."}
# #             return Response(data = message, status = status.HTTP_400_BAD_REQUEST)

# if request.method == 'POST':
	# 	user_id = request.data['user_id']
	# 	if login_status(user_id):
	# 		post = Post.objects.get(post_id = request.data['post'])
        
    #         postlike = PostLike(post = post, user = user_id)
			
			# collected_in = Collected_In(post=post, category=category)
			# serializer = CollectedInSerializer(collected_in, data=request.data)
			# if serializer.is_valid():
			# 	if (Collected_In.objects.filter(post=post, category=category).count() == 0):
			# 		serializer.save()
			# 		return Response(status=status.HTTP_201_CREATED)
			# 	else:
			# 		return Response("The post has been collected in this category.", status=status.HTTP_400_BAD_REQUEST)
			# return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)