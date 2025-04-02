package mk.ukim.finki.fithubapi.VenueService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.VenueService.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Subscription findByCustomerId(String customerId);
    Subscription findByVenueId(Long venueId);
    List<Subscription> findAllByVenue_IdIn(List<Long> venueIds);
    @Query("SELECT s FROM Subscription s WHERE YEAR(s.expirationDate) = :year " +
            "AND MONTH(s.expirationDate) = :month " +
            "AND DAY(s.expirationDate) = :day")
    List<Subscription> findByExpirationDateIgnoringTime(@Param("year") int year,
                                                        @Param("month") int month,
                                                        @Param("day") int day);

}
