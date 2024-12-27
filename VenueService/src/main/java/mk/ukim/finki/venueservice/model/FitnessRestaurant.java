package mk.ukim.finki.venueservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class FitnessRestaurant extends Venue{
    @OneToOne(fetch = FetchType.EAGER)
    private Menu menu;
}
