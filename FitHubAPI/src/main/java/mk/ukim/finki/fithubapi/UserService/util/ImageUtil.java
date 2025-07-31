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
            String sanitizedBase64String = base64String.trim().replaceAll("[^A-Za-z0-9+/=]", "");
            return Base64.getDecoder().decode(sanitizedBase64String);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid base64 string", e);
        }
    }
    public static String resizeAvatarToBase64(byte[] avatarBytes) {
        try {
            byte[] resizedBytes = ImageResizeUtil.resizeForAvatar(avatarBytes);

            String base64String = ImageUtil.encodeToBase64(resizedBytes);
            return "data:image/jpeg;base64," + base64String;

        } catch (Exception e) {
            System.err.println("Resize failed: " + e.getMessage());
            try {
                String originalBase64 = ImageUtil.encodeToBase64(avatarBytes);
                return "data:image/jpeg;base64," + originalBase64;
            } catch (Exception fallbackError) {
                System.err.println("Fallback 1 failed: " + fallbackError.getMessage());
                return null;
            }
        }
    }
}
