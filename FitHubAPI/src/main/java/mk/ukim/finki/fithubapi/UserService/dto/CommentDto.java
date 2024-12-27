package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;
    private Long userId;
    private Long postId;
    private String comment;
    private LocalDateTime creationDate;
}
