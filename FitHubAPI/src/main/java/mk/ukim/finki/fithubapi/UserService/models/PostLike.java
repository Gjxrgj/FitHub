package mk.ukim.finki.fithubapi.UserService.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    @ManyToOne
    private Post post;

    public PostLike(Long userId, Post post) {
        this.userId = userId;
        this.post = post;
    }
}
