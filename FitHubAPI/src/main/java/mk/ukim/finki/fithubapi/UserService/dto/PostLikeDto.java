package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

@Data
public class PostLikeDto {
    private Long id;
    private Long userId;
    private Long postId;
}
