package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class SubscriptionDto {
    private Long id;
    private String subscriptionId;
    private String customerId;
    private LocalDateTime expirationDate;
    private Boolean isActive;
    private Long venueId;
}
