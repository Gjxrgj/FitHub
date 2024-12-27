package mk.ukim.finki.fithubapi.UserService.mapper;

import mk.ukim.finki.fithubapi.UserService.dto.PostLikeDto;
import mk.ukim.finki.fithubapi.UserService.models.PostLike;

import java.util.List;
import java.util.stream.Collectors;

public class LikeMapper {

    public static PostLikeDto toDto(PostLike postLike) {
        if (postLike == null) {
            return null;
        }

        PostLikeDto postLikeDto = new PostLikeDto();
        postLikeDto.setId(postLike.getId());
        postLikeDto.setUserId(postLike.getUserId());
        postLikeDto.setPostId(postLike.getPost() != null ? postLike.getPost().getId() : null);

        return postLikeDto;
    }

    public static List<PostLikeDto> toDtoList(List<PostLike> postLikes) {
        if (postLikes == null) {
            return null;
        }

        return postLikes.stream()
                .map(LikeMapper::toDto)
                .collect(Collectors.toList());
    }
}
