package mk.ukim.finki.fithubapi.UserService.dto;

public record SubscriptionResponse(String id, String status, String customerId, String clientSecret) {
    public static SubscriptionResponse fromStripeSubscription(com.stripe.model.Subscription subscription, String clientSecret) {
        return new SubscriptionResponse(
                subscription.getId(),
                subscription.getStatus(),
                subscription.getCustomer(),
                clientSecret
        );
    }
}
