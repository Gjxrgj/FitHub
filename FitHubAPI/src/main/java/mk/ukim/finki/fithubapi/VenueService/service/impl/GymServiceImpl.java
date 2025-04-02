package mk.ukim.finki.fithubapi.VenueService.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;
import mk.ukim.finki.fithubapi.VenueService.dto.*;
import mk.ukim.finki.fithubapi.VenueService.exception.PromotionNotFoundException;
import mk.ukim.finki.fithubapi.VenueService.mapper.GroupTrainingMapper;
import mk.ukim.finki.fithubapi.VenueService.mapper.GymMapper;
import mk.ukim.finki.fithubapi.VenueService.mapper.PersonalTrainingMapper;
import mk.ukim.finki.fithubapi.VenueService.mapper.PromotionMapper;
import mk.ukim.finki.fithubapi.VenueService.model.*;
import mk.ukim.finki.fithubapi.VenueService.repository.*;
import mk.ukim.finki.fithubapi.VenueService.service.GymService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.VenueService.util.GeoUtils.Radius;
import static mk.ukim.finki.fithubapi.VenueService.util.GeoUtils.calculateBoundingBox;


@Service
@AllArgsConstructor
public class GymServiceImpl implements GymService {

    private final GymRepository gymRepository;

    private final GroupTrainingRepository groupTrainingRepository;

    private final PersonalTrainingRepository personalTrainingRepository;

    private final ProfessionalTrainerRepository professionalTrainerRepository;

    private final PromotionRepository promotionRepository;

    private final SubscriptionRepository subscriptionRepository;

    @Override
    public GymDto getById(@NotNull Long id) {
        Gym gym = gymRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));
        Subscription subscription = subscriptionRepository.findByVenueId(id);
        GymDto gymDto = GymMapper.toDto(gym);
        gymDto.setSubscriptionExpirationDate(subscription.getExpirationDate().toLocalDate());
        return gymDto;
    }

    @Override
    public List<GymDto> getAllByUser(Long userId) {
        List<Gym> gyms = gymRepository.findAllByUserId(userId);
        return GymMapper.allToDto(gyms);
    }


    @Override
    public List<GymDto> getAllByLocation(Double latitude, Double longitude) {

        Map<String, Double> bounds = calculateBoundingBox(latitude, longitude, Radius);

        List<Gym> gyms = gymRepository.findAllWithinRadius(
                latitude, longitude, Radius,
                bounds.get("minLatitude"), bounds.get("maxLatitude"),
                bounds.get("minLongitude"), bounds.get("maxLongitude")
        );

        return GymMapper.allToDto(gyms);
    }

    @Override
    @Transactional
    public GymDto add(@NotNull UpsertGymDto dto, @NotNull SubscriptionResponse subscriptionResponse) {
        Gym gym = GymMapper.toModel(dto);
        mk.ukim.finki.fithubapi.VenueService.model.Subscription subscriptionToSave = new mk.ukim.finki.fithubapi.VenueService.model.Subscription(
                subscriptionResponse.id(),
                subscriptionResponse.customerId(),
                gym
        );

        gym.setSubscriptionForVenue(subscriptionToSave);

        subscriptionRepository.save(subscriptionToSave);

        return GymMapper.toDto(gymRepository.save(gym));
    }

    @Override
    @Transactional
    public GymDto edit(@NotNull UpsertGymDto dto, @NotNull Long id) {
        Gym gym = gymRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));

        gym.setUserId(dto.getUserId());
        gym.setName(dto.getName());
        gym.setVicinity(dto.getVicinity());
        gym.setLatitude(dto.getLatitude());
        gym.setLongitude(dto.getLongitude());
        gym.setDescription(dto.getDescription());
        gym.setContactNumber(dto.getContactNumber());
        gym.setContactEmail(dto.getContactEmail());
        gym.setBusinessWebsite(dto.getBusinessWebsite());
        gym.setAvatar(dto.getAvatar() != null ? decodeFromBase64(dto.getAvatar()) : null);
        gym.setDailyPassPrice(dto.getDailyPassPrice());
        gym.setMonthlySubscription(dto.getMonthlySubscription());
        gym.setCurrency(dto.getCurrency());

        Gym savedGym = gymRepository.save(gym);
        return GymMapper.toDto(savedGym);
    }

    @Override
    @Transactional
    public Long delete(@NotNull Long id) {
        Gym gym = gymRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));
        gymRepository.delete(gym);
        return id;
    }

    @Override
    @Transactional
    public List<PromotionDto> addPromotion(Long id, UpsertPromotionDto promotionDto) {
        Gym gym = gymRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));
        List<Promotion> gymPromotions = gym.getPromotions();
        gymPromotions.add(PromotionMapper.toEntity(promotionDto, gym));
        gym.setPromotions(gymPromotions);
        Gym savedGym = gymRepository.save(gym);
        return PromotionMapper.toDtoList(savedGym.getPromotions());
    }

    @Override
    @Transactional
    public List<PromotionDto> removePromotion(Long id) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new PromotionNotFoundException("Promotion with id " + id + "not found."));
        Gym gym = promotion.getGym();
        List<Promotion> gymPromotions = gym.getPromotions();
        gymPromotions.remove(promotion);
        gym.setPromotions(gymPromotions);
        Gym savedGym = gymRepository.save(gym);
        promotionRepository.delete(promotion);
        return PromotionMapper.toDtoList(savedGym.getPromotions());
    }

    @Override
    public List<GroupTrainingDto> addGroupTraining(Long id, UpsertGroupTrainingDto upsertGroupTrainingDto) {
        Gym gym = gymRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));
        List<GroupTraining> currentGroupTrainings = gym.getGroupTrainings();
        ProfessionalTrainer professionalTrainer = professionalTrainerRepository.findById(upsertGroupTrainingDto.getProfessionalTrainerId())
                        .orElseThrow(() -> new NoSuchElementException("Personal trainer with id " + upsertGroupTrainingDto.getProfessionalTrainerId()+ " doesn't exist"));
        currentGroupTrainings.add(GroupTrainingMapper.toEntity(upsertGroupTrainingDto, gym, professionalTrainer));
        gym.setGroupTrainings(currentGroupTrainings);
        Gym savedGym = gymRepository.save(gym);
        return GroupTrainingMapper.toDtoList(savedGym.getGroupTrainings());
    }

    @Override
    public List<GroupTrainingDto> removeGroupTraining(Long id) {
        GroupTraining groupTraining = groupTrainingRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Group training with ID " + id + " not found."));
        Gym gym = groupTraining.getGym();
        List<GroupTraining> currentGroupTrainings = gym.getGroupTrainings();
        currentGroupTrainings.remove(groupTraining);
        Gym savedGym = gymRepository.save(gym);
        groupTrainingRepository.delete(groupTraining);
        return GroupTrainingMapper.toDtoList(savedGym.getGroupTrainings());
    }

    @Override
    public List<PersonalTrainingDto> addPersonalTraining(Long id, UpsertPersonalTrainingDto upsertGroupTrainingDto) {
        Gym gym = gymRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));
        List<PersonalTraining> currentPersonalTrainings = gym.getPersonalTrainings();
        ProfessionalTrainer professionalTrainer = professionalTrainerRepository
                .findById(upsertGroupTrainingDto.getProfessionalTrainerId())
                .orElseThrow(() -> new NoSuchElementException("Professional trainer with ID " + id + " not found."));
        currentPersonalTrainings.add(PersonalTrainingMapper.toEntity(upsertGroupTrainingDto, gym, professionalTrainer));
        gym.setPersonalTrainings(currentPersonalTrainings);
        Gym savedGym = gymRepository.save(gym);
        return PersonalTrainingMapper.toDtoList(savedGym.getPersonalTrainings());
    }

    @Override
    public PricingDto updatePricing(Long id, PricingDto pricingDto) {
        Gym gym = gymRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));
        gym.setDailyPassPrice(pricingDto.getDailyPass());
        gym.setMonthlySubscription(pricingDto.getMonthlySubscription());
        gymRepository.save(gym);
        PricingDto pricing = new PricingDto();
        pricing.setDailyPass(gym.getDailyPassPrice());
        pricing.setMonthlySubscription(gym.getMonthlySubscription());
        return pricing;
    }

    @Override
    @Transactional
    public List<PersonalTrainingDto> removePersonalTraining(Long id) {
        PersonalTraining personalTraining = personalTrainingRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Personal training with ID " + id + " not found."));
        Gym gym = personalTraining.getGym();
        ProfessionalTrainer professionalTrainer = personalTraining.getProfessionalTrainer();
        List<PersonalTraining> currentPersonalTrainingsForTrainer = professionalTrainer.getPersonalTraining();
        currentPersonalTrainingsForTrainer.remove(personalTraining);
        professionalTrainer.setPersonalTraining(currentPersonalTrainingsForTrainer);
        professionalTrainerRepository.save(professionalTrainer);
        List<PersonalTraining> currentPersonalTrainings = gym.getPersonalTrainings();
        currentPersonalTrainings.remove(personalTraining);
        Gym savedGym = gymRepository.save(gym);
        personalTrainingRepository.delete(personalTraining);
        return PersonalTrainingMapper.toDtoList(savedGym.getPersonalTrainings());
    }

}
