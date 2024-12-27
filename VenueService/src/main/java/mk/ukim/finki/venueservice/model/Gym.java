package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.venueservice.enums.Currency;

import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Gym extends Venue {
    private Double dailyPassPrice;
    private Double monthlySubscription;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    @OneToMany(mappedBy = "gym", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Promotion> promotions;
    @OneToMany(mappedBy = "gym", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<PersonalTraining> personalTrainings;
    @OneToMany(mappedBy = "gym", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<GroupTraining> groupTrainings;
}
