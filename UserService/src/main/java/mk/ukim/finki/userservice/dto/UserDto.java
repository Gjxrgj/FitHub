package mk.ukim.finki.userservice.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private byte[] avatar;
    private String bio;
    private String oauth2Id;

}
