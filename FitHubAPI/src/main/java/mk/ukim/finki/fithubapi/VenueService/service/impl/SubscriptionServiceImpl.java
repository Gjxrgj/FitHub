package mk.ukim.finki.fithubapi.VenueService.service.impl;

import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionDto;
import mk.ukim.finki.fithubapi.VenueService.mapper.SubscriptionMapper;
import mk.ukim.finki.fithubapi.VenueService.model.Subscription;
import mk.ukim.finki.fithubapi.VenueService.repository.SubscriptionRepository;
import mk.ukim.finki.fithubapi.VenueService.service.SubscriptionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public List<SubscriptionDto> getAllByIds(List<Long> venueIds) {
        return SubscriptionMapper.toDtoList(subscriptionRepository.findAllByVenue_IdIn(venueIds));
    }

    @Override
    public String getCustomerIdByVenueId(Long venueId) {
        return subscriptionRepository.findByVenueId(venueId).getCustomerId();
    }

    @Override
    public Long updateSubscription(Long venueId) {
        Subscription subscription = subscriptionRepository.findByVenueId(venueId);
        if(subscription.getIsActive()){
            subscription.setExpirationDate(subscription.getExpirationDate().plusMonths(1));
        }
        else {
            subscription.setExpirationDate(LocalDateTime.now().plusMonths(1));
            subscription.setIsActive(true);
        }
        return subscriptionRepository.save(subscription).getId();
    }
}
