package mk.ukim.finki.fithubapi.VenueService.service.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Invoice;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Subscription;
import com.stripe.net.RequestOptions;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.SubscriptionCreateParams;
import com.stripe.param.SubscriptionCreateParams.Item;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;
import mk.ukim.finki.fithubapi.VenueService.service.StripeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeServiceImpl implements StripeService {
    private final String stripeApiKey;

    public StripeServiceImpl(@Value("${stripe.api.key}") String stripeApiKey) {
        if (stripeApiKey == null || stripeApiKey.isBlank()) {
            throw new IllegalArgumentException("Stripe API key is missing.");
        }
        this.stripeApiKey = stripeApiKey;
        Stripe.apiKey = stripeApiKey;
    }

    public SubscriptionResponse resubscribe(String customerId, String priceId) throws Exception {
        SubscriptionCreateParams params = SubscriptionCreateParams.builder()
                .setCustomer(customerId)
                .addItem(Item.builder().setPrice(priceId).build())
                .setPaymentBehavior(SubscriptionCreateParams.PaymentBehavior.DEFAULT_INCOMPLETE)
                .build();

        return getSubscriptionResponse(params);
    }

    public SubscriptionResponse firstTimeSubscription(String email, String paymentMethodId, String priceId) throws Exception {
        Customer customer = createCustomer(email, paymentMethodId);

        SubscriptionCreateParams params = SubscriptionCreateParams.builder()
                .setCustomer(customer.getId())
                .addItem(Item.builder().setPrice(priceId).build())
                .setPaymentBehavior(SubscriptionCreateParams.PaymentBehavior.DEFAULT_INCOMPLETE)
                .build();

        Subscription subscription = Subscription.create(params);

        RequestOptions requestOptions = RequestOptions.builder().setApiKey(stripeApiKey).build();
        Invoice latestInvoice = Invoice.retrieve(subscription.getLatestInvoice(), requestOptions);

        String paymentIntentId = latestInvoice.getPaymentIntent();

        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

        return new SubscriptionResponse(subscription.getId(), subscription.getStatus(), subscription.getCustomer(), paymentIntent.getClientSecret());
    }

    private SubscriptionResponse getSubscriptionResponse(SubscriptionCreateParams params) throws StripeException {
        Subscription subscription = Subscription.create(params);

        RequestOptions requestOptions = RequestOptions.builder().setApiKey(stripeApiKey).build();
        Invoice latestInvoice = Invoice.retrieve(subscription.getLatestInvoice(), requestOptions);

        String paymentIntentId = latestInvoice.getPaymentIntent();

        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

        return new SubscriptionResponse(subscription.getId(), subscription.getStatus(), subscription.getCustomer(), paymentIntent.getClientSecret());
    }

    private Customer createCustomer(String email, String paymentMethodId) throws Exception {
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(email)
                .setPaymentMethod(paymentMethodId)
                .setInvoiceSettings(CustomerCreateParams.InvoiceSettings.builder().setDefaultPaymentMethod(paymentMethodId).build())
                .build();

        return Customer.create(params);
    }
}
