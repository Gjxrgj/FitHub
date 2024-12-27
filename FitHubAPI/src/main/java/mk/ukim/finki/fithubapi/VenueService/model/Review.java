package mk.ukim.finki.fithubapi.VenueService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    private Double rating;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "venue_id")
    private Venue venue;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private ProfessionalTrainer trainer;

    public Review(Long userId, String username, String comment, Double rating, LocalDate date, Venue venue) {
        this.userId = userId;
        this.username = username;
        this.comment = comment;
        this.rating = rating;
        this.date = date;
        this.venue = venue;
        this.trainer = null;
    }
    public Review(Long userId, String username, String comment, Double rating, LocalDate date, ProfessionalTrainer trainer) {
        this.userId = userId;
        this.username = username;
        this.comment = comment;
        this.rating = rating;
        this.date = date;
        this.venue = null;
        this.trainer = trainer;
    }
}
