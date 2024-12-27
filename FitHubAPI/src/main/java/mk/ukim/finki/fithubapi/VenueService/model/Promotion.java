package mk.ukim.finki.fithubapi.VenueService.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer amountOfMonths;
    private Double price;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    private LocalDate validUntil;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "gym_id")
    private Gym gym;

    public Promotion(Integer amountOfMonths, Double price, Currency currency, LocalDate validUntil, Gym gym) {
        this.amountOfMonths = amountOfMonths;
        this.price = price;
        this.currency = currency;
        this.validUntil = validUntil;
        this.gym = gym;
    }
}
