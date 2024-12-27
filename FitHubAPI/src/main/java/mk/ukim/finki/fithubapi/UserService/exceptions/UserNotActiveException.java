package mk.ukim.finki.fithubapi.UserService.exceptions;

public class UserNotActiveException extends RuntimeException{
    public UserNotActiveException(String message) {
        super(message);
    }
}
