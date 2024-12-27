package mk.ukim.finki.fithubapi.UserService.util;

import java.util.Base64;

public class ImageUtil {

    public static String encodeToBase64(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }

    public static byte[] decodeFromBase64(String base64String) {
        if (base64String == null || base64String.isEmpty()) {
            throw new IllegalArgumentException("Base64 string cannot be null or empty");
        }
        try {
            // Sanitize input by removing non-base64 characters and padding
            String sanitizedBase64String = base64String.trim().replaceAll("[^A-Za-z0-9+/=]", "");
            return Base64.getDecoder().decode(sanitizedBase64String);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid base64 string", e);
        }
    }
}
