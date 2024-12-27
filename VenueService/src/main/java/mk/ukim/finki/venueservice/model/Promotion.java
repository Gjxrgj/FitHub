package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.venueservice.enums.Currency;

import java.time.LocalDate;

@Data
@Entity
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
    @JoinColumn(name = "gym_id")
    private Gym gym;
}
