package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionDto;
import mk.ukim.finki.fithubapi.VenueService.model.Subscription;

import java.util.List;

public class SubscriptionMapper {
    public static SubscriptionDto toDto(Subscription subscription) {
        if (subscription == null) {
            return null;
        }
        SubscriptionDto subscriptionDto = new SubscriptionDto();

        subscriptionDto.setId(subscription.getId());
        subscriptionDto.setCustomerId(subscriptionDto.getCustomerId());
        subscriptionDto.setIsActive(subscription.getIsActive());
        subscriptionDto.setExpirationDate(subscription.getExpirationDate());
        subscriptionDto.setVenueId(subscription.getVenue().getId());
        subscriptionDto.setSubscriptionId(subscriptionDto.getSubscriptionId());

        return subscriptionDto;
    }

    public static List<SubscriptionDto> toDtoList(List<Subscription> subscriptions){
        return subscriptions.stream().map(SubscriptionMapper::toDto).toList();
    }
}
