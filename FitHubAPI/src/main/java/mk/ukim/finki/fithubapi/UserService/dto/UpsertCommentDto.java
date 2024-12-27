package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

@Data
public class UpsertCommentDto {
    private Long userId;
    private Long postId;
    private String comment;
}
