package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

@Data
public class LiteUserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String avatar;

    public LiteUserDto(Long id, String username, String firstName, String lastName, String avatar) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
    }
}
