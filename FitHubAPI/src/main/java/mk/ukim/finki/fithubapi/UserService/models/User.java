package mk.ukim.finki.fithubapi.UserService.models;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.fithubapi.UserService.enums.ActivityLevel;
import mk.ukim.finki.fithubapi.UserService.enums.Gender;
import mk.ukim.finki.fithubapi.UserService.enums.Goal;
import mk.ukim.finki.fithubapi.UserService.enums.Unit;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "FitHubUser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    private String firstName;
    private String lastName;
    private Long professionalTrainerId;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private Double height;
    private Double weight;
    private LocalDate birthDate;
    @Enumerated(EnumType.STRING)
    private Goal goal;
    @Enumerated(EnumType.STRING)
    private ActivityLevel activityLevel;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    private Unit unit;
    @Column(name = "avatar", columnDefinition = "bytea")
    private byte[] avatar;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_followers", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "follower_id")
    private List<Long> followers;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_following", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "following_id")
    private List<Long> following;
    @OneToMany
    private List<Post> posts = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_venue_ids", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "venue_id")
    private List<Long> venueIds;
    private String bio;
    private String oauth2Id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer dailyCalories;
    @Column(nullable = false)
    private boolean isActive = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public User() {
        roles = new HashSet<>();
    }

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void addRole(Role role) {
        roles.add(role);
    }

    public void addPost(Post post) {
        if (this.posts == null) {
            this.posts = new ArrayList<>();
        }
        this.posts.add(post);
    }

    public void addFollower(Long userId) {
        this.followers.add(userId);
    }

    public void addFollowing(Long userId) {
        this.following.add(userId);
    }

    public void removeFollower(Long userId) {
        this.followers.remove(userId);
    }

    public void removeFollowing(Long userId) {
        this.following.remove(userId);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }
}
