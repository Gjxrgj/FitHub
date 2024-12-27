package mk.ukim.finki.fithubapi.VenueService.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "data", columnDefinition = "bytea")
    private byte[] data;
    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    @JsonIgnore
    private Venue venue;

    public Image(byte[] data, Venue venue) {
        this.data = data;
        this.venue = venue;
    }

    public Image() {

    }
}
