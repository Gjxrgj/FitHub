package mk.ukim.finki.userservice.initializer;

import jakarta.transaction.Transactional;
import mk.ukim.finki.userservice.enums.RoleName;
import mk.ukim.finki.userservice.models.Role;
import mk.ukim.finki.userservice.models.User;
import mk.ukim.finki.userservice.repository.RoleRepository;
import mk.ukim.finki.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if(roleRepository.findByName(RoleName.USER).isEmpty()){
            Role userRole = new Role(RoleName.USER);
            userRole.onCreate();
            roleRepository.save(userRole);
        }
        if(roleRepository.findByName(RoleName.ADMIN).isEmpty()){
            Role adminRole = new Role(RoleName.ADMIN);
            adminRole.onCreate();
            roleRepository.save(adminRole);
        }

        if (userRepository.findByEmail("defaultAdmin@outlook.com").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setFirstName("Admin Name");
            admin.setLastName("Admin Surname");
            admin.setEmail("defaultAdmin@outlook.com");
            admin.setPassword(passwordEncoder.encode("adminpassword"));
            admin.setActive(true);
            admin.onCreate();
            admin.setBio("Bio of default admin.");
            userRepository.save(admin);
        }

        if (userRepository.findByEmail("defaultUser@outlook.com").isEmpty()) {
            User user = new User();
            user.setUsername("user");
            user.setFirstName("User Name");
            user.setLastName("User Surname");
            user.setEmail("defaultUser@outlook.com");
            user.setPassword(passwordEncoder.encode("userpassword"));
            user.setActive(true);
            user.onCreate();
            user.setBio("Bio of default user.");
            userRepository.save(user);
        }
    }
}
