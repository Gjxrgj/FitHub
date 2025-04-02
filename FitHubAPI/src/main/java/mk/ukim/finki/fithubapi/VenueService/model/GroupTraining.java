package mk.ukim.finki.fithubapi.VenueService.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;

@Data
@Entity
@NoArgsConstructor
public class GroupTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 500)
    private String description;
    private Double price;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "gym_id")
    private Gym gym;
    @ManyToOne
    @JsonIgnore
    private ProfessionalTrainer professionalTrainer;

    public GroupTraining(String name, String description, Double price, Currency currency, Gym gym, ProfessionalTrainer professionalTrainer) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.gym = gym;
        this.professionalTrainer = professionalTrainer;
    }
}
