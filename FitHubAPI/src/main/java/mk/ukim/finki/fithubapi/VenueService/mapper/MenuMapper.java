package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.MenuDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertMealDto;
import mk.ukim.finki.fithubapi.VenueService.model.Menu;

public class MenuMapper {
    public static MenuDto toDto(Menu menu) {
        MenuDto menuDTO = new MenuDto();
        menuDTO.setId(menu.getId());
        menuDTO.setMeals(MealMapper.toDtoList(menu.getMeals()));
        return menuDTO;
    }
}
