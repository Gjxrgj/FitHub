package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

@Data
public class ResubscribeRequest {
    private Long venueId;
    private String priceId;
}
