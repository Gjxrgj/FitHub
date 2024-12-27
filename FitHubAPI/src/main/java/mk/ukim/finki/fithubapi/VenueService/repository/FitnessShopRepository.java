package mk.ukim.finki.fithubapi.VenueService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.VenueService.model.FitnessShop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FitnessShopRepository extends JpaRepository<FitnessShop, Long> {

    List<FitnessShop> findAllByUserId(@NotNull Long userId);
    Optional<FitnessShop> findByName(@NotNull String name);

    @Query(value = "SELECT fs.id, " +
            "v.id, v.user_id, v.name, v.vicinity, v.latitude, v.longitude, v.description," +
            " v.contact_number, v.contact_email, v.business_website, v.avatar " +
            "FROM fitness_shop as fs " +
            "LEFT JOIN venue v ON fs.id = v.id " +
            "WHERE v.latitude BETWEEN :minLatitude AND :maxLatitude " +
            "AND v.longitude BETWEEN :minLongitude AND :maxLongitude " +
            "AND (6371 * acos( " +
            "   cos(radians(:latitude)) * cos(radians(v.latitude)) * " +
            "   cos(radians(v.longitude) - radians(:longitude)) + " +
            "   sin(radians(:latitude)) * sin(radians(v.latitude)) " +
            ")) <= :radius", nativeQuery = true)
    List<FitnessShop> findAllWithinRadius(@Param("latitude") double latitude,
                                  @Param("longitude") double longitude,
                                  @Param("radius") double radius,
                                  @Param("minLatitude") double minLatitude,
                                  @Param("maxLatitude") double maxLatitude,
                                  @Param("minLongitude") double minLongitude,
                                  @Param("maxLongitude") double maxLongitude);
}
