package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double quantity;
    @ManyToOne
    @JoinColumn(name = "meal_id", nullable = false)
    private Meal meal;
}
