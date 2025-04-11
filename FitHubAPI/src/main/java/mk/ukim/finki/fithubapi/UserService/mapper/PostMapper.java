package mk.ukim.finki.fithubapi.UserService.mapper;

import mk.ukim.finki.fithubapi.UserService.dto.PostDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertPostDto;
import mk.ukim.finki.fithubapi.UserService.models.Post;
import mk.ukim.finki.fithubapi.UserService.models.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.encodeToBase64;

public class PostMapper {

    public static PostDto toDto(Post post) {
        if (post == null) {
            return null;
        }

        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setUserId(post.getUser() != null ? post.getUser().getId() : null);
        postDto.setOwnerUsername(post.getOwnerUsername());
        postDto.setCreationDate(post.getCreationDate());
        postDto.setOwnerAvatar(post.getUser().getAvatar() != null ? encodeToBase64(post.getUser().getAvatar()) : null);
        postDto.setTitle(post.getTitle());
        postDto.setDescription(post.getDescription());

        postDto.setImage(post.getImage() != null ? encodeToBase64(post.getImage()) : null);

        postDto.setMealId(post.getMealTrackId());
        postDto.setWorkoutId(post.getWorkoutId());

        postDto.setComments(post.getComments().stream().map(CommentMapper::toDto).collect(Collectors.toList()));
        postDto.setLikes(post.getLikes().stream().map(LikeMapper::toDto).collect(Collectors.toList()));

        return postDto;
    }

    public static List<PostDto> toDtoList(List<Post> posts) {
        if (posts == null) {
            return null;
        }

        return posts.stream()
                .map(PostMapper::toDto)
                .collect(Collectors.toList());
    }

    public static Post toEntity(UpsertPostDto upsertPostDto, User user) {
        if (upsertPostDto == null) {
            return null;
        }

        Post post = new Post();
        post.setUser(user);
        post.setOwnerUsername(user != null ? user.getUsername() : null);
        post.setTitle(upsertPostDto.getTitle());
        post.setDescription(upsertPostDto.getDescription());
        post.setCreationDate(LocalDateTime.now());
        post.setComments(new ArrayList<>());
        post.setLikes(new ArrayList<>());

        if (upsertPostDto.getImage() != null && !upsertPostDto.getImage().isEmpty()) {
            post.setImage(decodeFromBase64(upsertPostDto.getImage()));
        }

        post.setMealTrackId(upsertPostDto.getMealId());
        post.setWorkoutId(upsertPostDto.getWorkoutId());

        return post;
    }
}
