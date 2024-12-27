package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.venueservice.enums.Currency;

import java.util.List;

@Data
@Entity
public class GroupTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double price;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    @OneToMany(mappedBy = "groupTraining", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ProfessionalTrainer> professionalTrainers;
    @ManyToOne
    @JoinColumn(name = "gym_id")
    private Gym gym;
}
