package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.ImageDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertImageDto;
import mk.ukim.finki.fithubapi.VenueService.model.Image;
import mk.ukim.finki.fithubapi.VenueService.model.Venue;

import java.util.ArrayList;
import java.util.List;

import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.decodeFromBase64;

public class ImageMapper {
    public static ImageDto toDto(Image image) {
        ImageDto imageDto = new ImageDto();
        imageDto.setData(image.getData());
        imageDto.setVenueId(imageDto.getVenueId());
        imageDto.setId(image.getId());
        return imageDto;
    }

    public static List<ImageDto> toDtoList(List<Image> images) {
        List<ImageDto> imageDtos = new ArrayList<>();
        for (Image image : images) {
            imageDtos.add(toDto(image));
        }
        return imageDtos;
    }

    public static Image toEntity(UpsertImageDto imageDto, Venue venue) {
        return new Image(imageDto.getData() != null ? decodeFromBase64(imageDto.getData()) : null, venue);
    }
}
