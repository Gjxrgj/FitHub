package mk.ukim.finki.fithubapi.VenueService.api;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.UserService.dto.ResubscribeRequest;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionRequest;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;
import mk.ukim.finki.fithubapi.VenueService.service.StripeService;
import mk.ukim.finki.fithubapi.VenueService.service.SubscriptionService;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final StripeService stripeService;
    private final SubscriptionService subscriptionService;

    @PostMapping("/create-subscription")
    public SubscriptionResponse createSubscription(@RequestBody SubscriptionRequest request) {
        try {
            return stripeService.firstTimeSubscription(request.getEmail(), request.getPaymentMethodId(), request.getPriceId());
        } catch (Exception e) {
            throw new RuntimeException("Error creating subscription", e);
        }
    }

    @PostMapping("/resubscribe")
    public SubscriptionResponse resubscribe(@RequestBody ResubscribeRequest request) {
        try {
            return stripeService.resubscribe(subscriptionService.getCustomerIdByVenueId(request.getVenueId()), request.getPriceId());
        } catch (Exception e) {
            throw new RuntimeException("Error resubscribing", e);
        }
    }
    @PostMapping("/update-subscription/{venueId}")
    public Long updateSubscription(@NotNull @PathVariable Long venueId) {
        try {
            return subscriptionService.updateSubscription(venueId);
        } catch (Exception e) {
            throw new RuntimeException("Error updating subscription", e);
        }
    }
}
