package mk.ukim.finki.fithubapi.VenueService.service;

import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionDto;

import java.util.List;

public interface SubscriptionService {
    List<SubscriptionDto> getAllByIds(List<Long> venueIds);

    String getCustomerIdByVenueId(Long venueId);

    Long updateSubscription(Long venueId);
}
