package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

@Data
public class SubscriptionRequest {
    private String email;
    private String paymentMethodId;
    private String priceId;
}
