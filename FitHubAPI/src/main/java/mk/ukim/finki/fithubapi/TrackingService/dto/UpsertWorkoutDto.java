package mk.ukim.finki.fithubapi.TrackingService.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpsertWorkoutDto {
    private String name;
    private LocalDate dayDate;
}
