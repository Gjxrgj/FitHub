package mk.ukim.finki.fithubapi.VenueService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Meal> meals;
    @OneToOne(mappedBy = "menu")
    @JsonIgnore
    private FitnessRestaurant fitnessRestaurant;

    public Menu(List<Meal> meals, FitnessRestaurant fitnessRestaurant) {
        this.meals = meals;
        this.fitnessRestaurant = fitnessRestaurant;
    }

    public Menu(List<Meal> meals) {
        this.meals = meals;
    }

    public void addMeal(Meal meal){
        meals.add(meal);
    }

    public void removeMeal(Meal meal){
        meals.remove(meal);
    }
}

