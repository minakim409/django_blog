from xml.etree.ElementTree import Comment
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

from authentication.funts import login_status

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
            serializer = PostSerializer(data = request.data)
            if serializer.is_valid(raise_exception=True):
                newPost = serializer.save()     
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
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)

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


@api_view(['GET', 'POST'])
def comment_list(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        author_id = request.data['author']
        # post_id = request.data['PostForComment']
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
        comment = Comment.objects.get(id = pk)
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