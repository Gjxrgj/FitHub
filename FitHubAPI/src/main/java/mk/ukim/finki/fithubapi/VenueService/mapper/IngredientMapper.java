package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.IngredientDto;
import mk.ukim.finki.fithubapi.VenueService.dto.PromotionDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertIngredientDto;
import mk.ukim.finki.fithubapi.VenueService.model.Ingredient;
import mk.ukim.finki.fithubapi.VenueService.model.Meal;
import mk.ukim.finki.fithubapi.VenueService.model.Promotion;

import java.util.ArrayList;
import java.util.List;

public class IngredientMapper {

    public static IngredientDto toDto(Ingredient ingredient) {
        IngredientDto ingredientDTO = new IngredientDto();
        ingredientDTO.setId(ingredient.getId());
        ingredientDTO.setName(ingredient.getName());
        ingredientDTO.setQuantity(ingredient.getQuantity());
        return ingredientDTO;
    }

    public static List<IngredientDto> toDtoList(List<Ingredient> ingredients) {
        List<IngredientDto> ingredientDtos = new ArrayList<>();
        for (Ingredient ingredient : ingredients) {
            ingredientDtos.add(toDto(ingredient));
        }
        return ingredientDtos;
    }

    public static List<Ingredient> toEntityList(List<UpsertIngredientDto> ingredientDtos, Meal meal){
        List<Ingredient> ingredients = new ArrayList<>();
        for(UpsertIngredientDto ingredientDto : ingredientDtos){
            ingredients.add(toEntity(ingredientDto, meal));
        }
        return ingredients;
    }

    public static Ingredient toEntity(UpsertIngredientDto upsertIngredientDto, Meal meal){
        return new Ingredient(
                upsertIngredientDto.getName(),
                upsertIngredientDto.getQuantity(),
                meal
        );
    }

}
