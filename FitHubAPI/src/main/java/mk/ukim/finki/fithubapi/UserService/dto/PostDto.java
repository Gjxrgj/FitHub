package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDto implements Serializable {
    private Long id;
    private Long userId;
    private String ownerUsername;
    private String title;
    private String description;
    private String image;
    private String ownerAvatar;
    private LocalDateTime creationDate;
    private Long mealId;
    private Long workoutId;
    private List<CommentDto> comments;
    private List<PostLikeDto> likes;
}
