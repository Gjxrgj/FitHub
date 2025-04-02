package mk.ukim.finki.fithubapi.VenueService.service;

import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;

public interface StripeService {

    SubscriptionResponse resubscribe(String customerId, String priceId) throws Exception;

    SubscriptionResponse firstTimeSubscription(String email, String paymentMethodId, String priceId) throws Exception;
}
