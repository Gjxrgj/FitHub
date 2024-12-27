package mk.ukim.finki.fithubapi.UserService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.models.Post;
import mk.ukim.finki.fithubapi.UserService.models.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByUserIdAndPost(@NotNull Long userId, @NotNull Post post);
}
