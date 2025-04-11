package mk.ukim.finki.fithubapi.UserService.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    private String ownerUsername;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    @Column(name = "image", columnDefinition = "bytea")
    private byte[] image;
    private Long mealTrackId;
    private Long workoutId;
    @OneToMany
    private List<Comment> comments;
    @OneToMany
    private List<PostLike> likes;

    public void addLike(PostLike postLike){
        if(this.likes == null){
            this.likes = new ArrayList<>();
        }
        this.likes.add(postLike);
    }
    public void removeLike(PostLike postLike){
        if(!this.likes.isEmpty()){
            this.likes.remove(postLike);
        }
    }
    public void addComment(Comment comment){
        if(this.comments == null){
            this.comments = new ArrayList<>();
        }
        this.comments.add(comment);
    }
    public void removeComment(Comment comment){
        if(!this.comments.isEmpty()){
            this.comments.remove(comment);
        }
    }
}
