package mk.ukim.finki.userservice.repository;

import mk.ukim.finki.userservice.enums.RoleName;
import mk.ukim.finki.userservice.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository  extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
