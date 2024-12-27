package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class ProfessionalTrainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String phoneNumber;
    private String email;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @OneToOne(mappedBy = "professionalTrainer", fetch = FetchType.EAGER)
    private PersonalTraining personalTraining;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "group_training_id")
    private GroupTraining groupTraining;
}
