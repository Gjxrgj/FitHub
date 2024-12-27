package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String avatar;
    private String bio;
    private String oauth2Id;
    private Integer dailyCalories;
    private Integer numFollowers;
    private Integer numFollowing;
    private Integer numPosts;
}
