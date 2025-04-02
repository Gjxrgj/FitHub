package mk.ukim.finki.fithubapi.UserService.repository;

import mk.ukim.finki.fithubapi.UserService.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByOauth2Id(String oauth2Id);

    List<User> findAllByUsernameContainingIgnoreCase(String username);

    List<User> findAllByIdIn(List<Long> ids);
}
