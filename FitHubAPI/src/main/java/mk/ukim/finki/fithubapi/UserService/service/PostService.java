package mk.ukim.finki.fithubapi.UserService.service;

import mk.ukim.finki.fithubapi.UserService.dto.PostDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertCommentDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertPostDto;

import java.util.List;

public interface PostService {
    PostDto addPost(UpsertPostDto upsertPostDto);

    List<PostDto> getAllPostsForUsersFeed(Long userId, Integer page, Integer size);

    Long deletePost(Long postId);

    PostDto likePost(Long postId, Long userId);

    PostDto unlikePost(Long postId, Long userId);

    PostDto addCommentToPost(Long postId, UpsertCommentDto upsertCommentDto);

    PostDto removeComment(Long commentId);

    List<PostDto> getAllPostsForUser(Long userId);

    PostDto gePostById(Long postId);

    PostDto editPost(Long id, UpsertPostDto upsertPostDto);
}
