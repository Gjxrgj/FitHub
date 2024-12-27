package mk.ukim.finki.fithubapi.UserService.service.implementation;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.fithubapi.UserService.dto.PostDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertCommentDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertPostDto;
import mk.ukim.finki.fithubapi.UserService.exceptions.UserNotFoundException;
import mk.ukim.finki.fithubapi.UserService.mapper.CommentMapper;
import mk.ukim.finki.fithubapi.UserService.mapper.PostMapper;
import mk.ukim.finki.fithubapi.UserService.models.Comment;
import mk.ukim.finki.fithubapi.UserService.models.Post;
import mk.ukim.finki.fithubapi.UserService.models.PostLike;
import mk.ukim.finki.fithubapi.UserService.models.User;
import mk.ukim.finki.fithubapi.UserService.repository.CommentRepository;
import mk.ukim.finki.fithubapi.UserService.repository.PostLikeRepository;
import mk.ukim.finki.fithubapi.UserService.repository.PostRepository;
import mk.ukim.finki.fithubapi.UserService.repository.UserRepository;
import mk.ukim.finki.fithubapi.UserService.service.PostService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public PostDto addPost(UpsertPostDto upsertPostDto) {
        User user = userRepository.findById(upsertPostDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + upsertPostDto.getUserId()));

        Post savedPost = postRepository.save(PostMapper.toEntity(upsertPostDto, user));

        user.addPost(savedPost);
        userRepository.save(user);

        return PostMapper.toDto(savedPost);
    }

    @Override
    @Transactional
    @Cacheable(value = "posts", key = "#userId + '-' + #page + '-' + #size")
    public List<PostDto> getAllPostsForUsersFeed(Long userId, Integer page, Integer size) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        List<Long> following = user.getFollowing();
        if (following.isEmpty()) {
            return List.of();
        }

        LocalDateTime baseTimeframe = LocalDateTime.now().minusWeeks(2);
        if (page == 0) {
            Long activityCount = postRepository.countPostsByFollowingIds(following, baseTimeframe);

            if (activityCount > 1000) {
                baseTimeframe = LocalDateTime.now().minusDays(3);
            } else if (activityCount > 100) {
                baseTimeframe = LocalDateTime.now().minusWeeks(1);
            } else if (activityCount > 50) {
                baseTimeframe = LocalDateTime.now().minusWeeks(2);
            } else {
                baseTimeframe = LocalDateTime.now().minusWeeks(3);
            }
        }

        LocalDateTime fromDate = baseTimeframe.minusWeeks(page);

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Post> postPage = postRepository.findPostsByFollowingIds(following, fromDate, pageRequest);

        if (postPage.isEmpty()) {
            return List.of();
        }

        return PostMapper.toDtoList(postPage.getContent());
    }

    @Override
    @Transactional
    public Long deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("No post found with id: " + postId));
        postRepository.delete(post);
        return postId;
    }

    @Override
    @Transactional
    public PostDto likePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("No post found with id: " + postId));

        PostLike postLike = new PostLike(userId, post);
        PostLike savedPostLike = postLikeRepository.save(postLike);

        post.addLike(savedPostLike);
        Post savedPost = postRepository.save(post);

        return PostMapper.toDto(savedPost);
    }

    @Override
    @Transactional
    public PostDto unlikePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("No post found with id: " + postId));

        PostLike postLike = postLikeRepository.findByUserIdAndPost(userId, post)
                .orElseThrow(() -> new NoSuchElementException("No post like found with post id: " + postId + " and userId: " + userId));

        post.removeLike(postLike);
        postLikeRepository.delete(postLike);
        Post savedPost = postRepository.save(post);

        return PostMapper.toDto(savedPost);
    }

    @Override
    @Transactional
    public PostDto addCommentToPost(Long postId, UpsertCommentDto upsertCommentDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("No post found with id: " + postId));

        Comment comment = CommentMapper.toEntity(upsertCommentDto, post);
        comment.setCreationDate(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);

        post.addComment(savedComment);
        Post savedPost = postRepository.save(post);

        return PostMapper.toDto(savedPost);
    }

    @Override
    @Transactional
    public PostDto removeComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NoSuchElementException("No comment found with id " + commentId));

        Post post = comment.getPost();

        post.removeComment(comment);
        commentRepository.delete(comment);

        Post savedPost = postRepository.save(post);
        commentRepository.save(comment);
        return PostMapper.toDto(savedPost);
    }

    @Override
    public List<PostDto> getAllPostsForUser(Long userId) {
        return PostMapper.toDtoList(postRepository
                .findAllByUser_Id(userId)
                .stream()
                .sorted(Comparator.comparing(Post::getCreationDate)
                        .reversed())
                .toList());
    }
}
