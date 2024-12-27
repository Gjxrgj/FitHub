package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.IngredientDto;
import mk.ukim.finki.fithubapi.VenueService.dto.MealDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertMealDto;
import mk.ukim.finki.fithubapi.VenueService.model.Ingredient;
import mk.ukim.finki.fithubapi.VenueService.model.Meal;
import mk.ukim.finki.fithubapi.VenueService.model.Menu;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MealMapper {

    public static MealDto toDto(Meal meal) {
        MealDto mealDTO = new MealDto();
        mealDTO.setId(meal.getId());
        mealDTO.setName(meal.getName());
        mealDTO.setCalories(meal.getCalories());
        mealDTO.setProteins(meal.getProteins());
        mealDTO.setFats(meal.getFats());
        mealDTO.setCarbs(meal.getCarbs());
        mealDTO.setPrice(meal.getPrice());
        mealDTO.setCurrency(meal.getCurrency());
        mealDTO.setMilliliters(meal.getMilliliters());
        mealDTO.setCategory(meal.getCategory());
        mealDTO.setIngredients(IngredientMapper.toDtoList(meal.getIngredients()));

        return mealDTO;
    }

    public static List<MealDto> toDtoList(List<Meal> meals) {
        List<MealDto> mealDtos = new ArrayList<>();
        for (Meal meal : meals) {
            mealDtos.add(toDto(meal));
        }
        return mealDtos;
    }

    public static Meal toEntity(UpsertMealDto upsertMealDto, Menu menu) {
        Meal meal = new Meal();
        meal.setName(upsertMealDto.getName());
        meal.setCalories(upsertMealDto.getCalories());
        meal.setProteins(upsertMealDto.getProteins());
        meal.setFats(upsertMealDto.getFats());
        meal.setCarbs(upsertMealDto.getCarbs());
        meal.setMilliliters(upsertMealDto.getMilliliters());
        meal.setPrice(upsertMealDto.getPrice());
        meal.setCurrency(upsertMealDto.getCurrency());
        meal.setCategory(upsertMealDto.getCategory());
        meal.setMenu(menu);
        meal.setIngredients(IngredientMapper.toEntityList(upsertMealDto.getIngredients(), meal));
        return meal;
    }
}
