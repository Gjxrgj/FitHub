package mk.ukim.finki.fithubapi.UserService.repository;

import mk.ukim.finki.fithubapi.UserService.models.Role;
import mk.ukim.finki.fithubapi.UserService.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository  extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
