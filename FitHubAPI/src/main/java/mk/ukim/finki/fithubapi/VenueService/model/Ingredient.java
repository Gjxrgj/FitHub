package mk.ukim.finki.fithubapi.VenueService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double quantity;
    @ManyToOne
    @JoinColumn(name = "meal_id", nullable = false)
    private Meal meal;

    public Ingredient(String name, Double quantity, Meal meal) {
        this.name = name;
        this.quantity = quantity;
        this.meal = meal;
    }
}
