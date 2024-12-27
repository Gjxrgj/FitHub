package mk.ukim.finki.venueservice.model;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.venueservice.enums.Currency;
import mk.ukim.finki.venueservice.enums.FoodCategory;

import java.util.List;

@Data
@Entity
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double calories;
    private Double proteins;
    private Double fats;
    private Double carbs;
    private Double price;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    private Double milliliters;
    private FoodCategory category;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Ingredient> ingredients;
    @ManyToOne
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;
}
