package mk.ukim.finki.fithubapi.VenueService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subscriptionId;
    private String customerId;
    @Setter
    private LocalDateTime expirationDate;
    private Boolean isActive;
    @OneToOne
    private Venue venue;

    public Subscription(String subscriptionId, String customerId, Venue venue) {
        this.subscriptionId = subscriptionId;
        this.customerId = customerId;
        this.venue = venue;
        this.expirationDate = LocalDateTime.now().plusMonths(1);
        this.isActive = true;
    }

    public Subscription() {
    }
}
