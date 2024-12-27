package mk.ukim.finki.fithubapi.VenueService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class ProfessionalTrainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String username;
    private String phoneNumber;
    private String email;
    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;
    @OneToMany(mappedBy = "professionalTrainer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PersonalTraining> personalTraining;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<GroupTraining> groupTrainings;

    public ProfessionalTrainer(Long userId, String username, String phoneNumber, String email, List<Review> reviews, List<PersonalTraining> personalTraining, List<GroupTraining> groupTrainings) {
        this.userId = userId;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.reviews = reviews;
        this.personalTraining = personalTraining;
        this.groupTrainings = groupTrainings;
    }
}
