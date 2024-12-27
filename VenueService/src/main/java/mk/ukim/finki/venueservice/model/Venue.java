package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String vicinity;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    private String description;
    private String contactNumber;
    private String contactEmail;
    private String businessWebsite;
    private byte[] avatar;

    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Review> reviews;

    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Image> images;
}
