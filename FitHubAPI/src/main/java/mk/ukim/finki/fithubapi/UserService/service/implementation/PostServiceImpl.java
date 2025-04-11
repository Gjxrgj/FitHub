package mk.ukim.finki.fithubapi.UserService.service.implementation;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.decodeFromBase64;

@Service
@AllArgsConstructor
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
    public List<PostDto> getAllPostsForUsersFeed(Long userId, Integer page, Integer size) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        final List<Long> following = user.getFollowing();
        if (following.isEmpty()) {
            return List.of();
        }

        LocalDateTime baseTimeframe = LocalDateTime.now().minusWeeks(2);
        if (page == 0) {
            final Long activityCount = postRepository.countPostsByFollowingIds(following, baseTimeframe);

            if (activityCount > 1000) {
                baseTimeframe = LocalDateTime.now().minusDays(3);
            } else if (activityCount > 100) {
                baseTimeframe = LocalDateTime.now().minusWeeks(1);
            } else if (activityCount > 50) {
                baseTimeframe = LocalDateTime.now().minusWeeks(2);
            } else {
                baseTimeframe = LocalDateTime.now().minusWeeks(10);
            }
        }

        final LocalDateTime fromDate = baseTimeframe.minusWeeks(page);

        final PageRequest pageRequest = PageRequest.of(page, size);
        final Page<Post> postPage = postRepository.findPostsByFollowingIds(following, fromDate, pageRequest);

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
        User user = post.getUser();
        user.getPosts().remove(post);

        commentRepository.deleteAll(post.getComments());
        postLikeRepository.deleteAll(post.getLikes());
        userRepository.save(user);
        postRepository.delete(post);

        return postId;
    }

    @Override
    @Transactional
    public PostDto likePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("No post found with id: " + postId));

        if (!post.getLikes().stream().map(PostLike::getUserId).toList().contains(userId)) {
            PostLike postLike = new PostLike(userId, post);
            PostLike savedPostLike = postLikeRepository.save(postLike);

            post.addLike(savedPostLike);
            Post savedPost = postRepository.save(post);

            return PostMapper.toDto(savedPost);
        }

        return PostMapper.toDto(post);
    }

    @Override
    @Transactional
    public PostDto unlikePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("No post found with id: " + postId));

        if (postLikeRepository.findByUserIdAndPost(userId, post).isPresent()) {
            PostLike postLike = postLikeRepository.findByUserIdAndPost(userId, post).get();
            post.removeLike(postLike);
            postLikeRepository.delete(postLike);
            Post savedPost = postRepository.save(post);
            return PostMapper.toDto(savedPost);

        }
        return PostMapper.toDto(post);
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

    @Override
    public PostDto gePostById(Long postId) {
        return PostMapper.toDto(postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("No post found with id " + postId)));
    }

    @Override
    public PostDto editPost(Long id, UpsertPostDto upsertPostDto) {
        Post existingPost = postRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No post found with id " + id));


        if (upsertPostDto.getImage() != null && !upsertPostDto.getImage().isEmpty()) {
            existingPost.setImage(decodeFromBase64(upsertPostDto.getImage()));
        }
        existingPost.setTitle(upsertPostDto.getTitle());
        existingPost.setDescription(upsertPostDto.getDescription());
        existingPost.setMealTrackId(upsertPostDto.getMealId());
        existingPost.setWorkoutId(upsertPostDto.getWorkoutId());

        Post savedPost = postRepository.save(existingPost);

        return PostMapper.toDto(savedPost);
    }
}
