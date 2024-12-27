package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.venueservice.enums.Currency;

@Data
@Entity
public class PersonalTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @OneToOne(fetch = FetchType.EAGER)
    private ProfessionalTrainer professionalTrainer;

    private Double price;
    @Enumerated(EnumType.STRING)
    private Currency currency;

    @ManyToOne
    @JoinColumn(name = "gym_id")
    private Gym gym;
}
