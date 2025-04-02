package mk.ukim.finki.fithubapi.UserService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.models.Post;
import mk.ukim.finki.fithubapi.UserService.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByUser_Id(Long userId);

    @Query("SELECT p FROM Post p WHERE p.user.id IN :followingIds AND p.creationDate >= :startDate ORDER BY p.creationDate DESC")
    Page<Post> findPostsByFollowingIds(@Param("followingIds") List<Long> followingIds, @Param("startDate") LocalDateTime startDate, Pageable pageable);

    @Query("SELECT COUNT(p) FROM Post p WHERE p.user.id IN :followingIds AND p.creationDate >= :fromDate")
    Long countPostsByFollowingIds(@Param("followingIds") List<Long> followingIds, @Param("fromDate") LocalDateTime fromDate);
}
