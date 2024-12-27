package mk.ukim.finki.fithubapi.VenueService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;
import mk.ukim.finki.fithubapi.VenueService.enums.FoodCategory;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double calories;
    private Double proteins;
    private Double fats;
    private Double carbs;
    private Double price;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    private Double milliliters;
    @Enumerated(EnumType.STRING)
    private FoodCategory category;
    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Ingredient> ingredients;
    @ManyToOne
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;

    public Meal(String name, Double calories, Double proteins, Double fats, Double carbs, Double price, Currency currency, Double milliliters, FoodCategory category, List<Ingredient> ingredients, Menu menu) {
        this.name = name;
        this.calories = calories;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.price = price;
        this.currency = currency;
        this.milliliters = milliliters;
        this.category = category;
        this.ingredients = ingredients;
        this.menu = menu;
    }
}
