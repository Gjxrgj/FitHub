package mk.ukim.finki.fithubapi.UserService.repository;

import mk.ukim.finki.fithubapi.UserService.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
