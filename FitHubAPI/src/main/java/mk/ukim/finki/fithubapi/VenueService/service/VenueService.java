package mk.ukim.finki.fithubapi.VenueService.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.enums.VenueType;
import mk.ukim.finki.fithubapi.VenueService.dto.*;

import java.util.List;
import java.util.Map;

public interface VenueService {
    Map<VenueType, List<Object>> getAllForUser(@NotNull Long userId);

    ReviewDto addReview(UpsertReviewDto upsertReviewDto, Long venueId);

    List<ImageDto> addImage(Long id, UpsertImageDto imageDto);

    List<ImageDto> removeImage(Long id);

    String updateAvatar(Long id, String avatar);

    String editDescription(Long id, String description);

    ContactInformationDto updateContactInformation(Long id, ContactInformationDto contactInformationDto);

    LocationDto updateLocation(Long id, LocationDto upsertLocationDto);


}
