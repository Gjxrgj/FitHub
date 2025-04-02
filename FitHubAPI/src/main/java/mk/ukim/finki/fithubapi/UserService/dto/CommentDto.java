package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CommentDto {
    private Long id;
    private Long userId;
    private Long postId;
    private String comment;
    private LocalDate creationDate;
}
