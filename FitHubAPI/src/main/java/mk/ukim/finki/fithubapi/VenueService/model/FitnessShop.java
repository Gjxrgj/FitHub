package mk.ukim.finki.fithubapi.VenueService.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class FitnessShop extends Venue {
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "fitness_shop_categories", joinColumns = @JoinColumn(name = "fitness_shop_id"))
    @Column(name = "category")
    private List<String> categories;
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "fitness_shop_brands", joinColumns = @JoinColumn(name = "fitness_shop_id"))
    @Column(name = "brand")
    private List<String> brands;
}
