package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "avatar", columnDefinition = "bytea")
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;
}
