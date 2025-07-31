package mk.ukim.finki.fithubapi.UserService.util;

import mk.ukim.finki.fithubapi.UserService.util.ImageUtil;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ImageResizeUtil {

    private static final int AVATAR_SIZE = 100;
    private static final String DEFAULT_FORMAT = "jpg";
    private static final float JPEG_QUALITY = 0.5f;

    /**
     * Resizes an image to avatar size (square) with default dimensions and quality
     */
    public static byte[] resizeForAvatar(byte[] imageData) throws IOException {
        return resizeForAvatar(imageData, AVATAR_SIZE, JPEG_QUALITY);
    }

    /**
     * Resizes an image to specified square dimensions for avatar use
     */
    public static byte[] resizeForAvatar(byte[] imageData, int size) throws IOException {
        return resizeForAvatar(imageData, size, JPEG_QUALITY);
    }

    /**
     * Resizes an image with custom size and quality - robust version
     */
    public static byte[] resizeForAvatar(byte[] imageData, int size, float quality) throws IOException {
        if (imageData == null || imageData.length == 0) {
            throw new IllegalArgumentException("Image data cannot be null or empty");
        }

        BufferedImage originalImage = null;

        try {
            originalImage = readImageSafely(imageData);
        } catch (Exception e1) {
            try {
                byte[] processedImageData = tryFixImageData(imageData);
                originalImage = readImageSafely(processedImageData);
            } catch (Exception e2) {
                System.out.println("Header reconstruction failed: " + e2.getMessage());

                try {
                    originalImage = findAndReadJpegData(imageData);
                } catch (Exception e3) {
                    System.out.println("JPEG search failed: " + e3.getMessage());
                    throw new IOException("Could not read image data with any method", e3);
                }
            }
        }

        if (originalImage == null) {
            throw new IOException("Failed to read image data");
        }

        BufferedImage resizedImage = createResizedImageSafely(originalImage, size);

        return imageToByteArray(resizedImage, DEFAULT_FORMAT, quality);
    }

    /**
     * Safely reads an image with error handling
     */
    private static BufferedImage readImageSafely(byte[] imageData) throws IOException {
        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(imageData)) {
            BufferedImage image = ImageIO.read(inputStream);
            if (image == null) {
                throw new IOException("ImageIO.read returned null");
            }

            if (image.getWidth() <= 0 || image.getHeight() <= 0) {
                throw new IOException("Invalid image dimensions: " + image.getWidth() + "x" + image.getHeight());
            }

            return image;
        }
    }

    /**
     * Searches for valid JPEG data anywhere in the byte array
     */
    private static BufferedImage findAndReadJpegData(byte[] data) throws IOException {
        for (int i = 0; i < data.length - 1; i++) {
            if (data[i] == (byte) 0xFF && data[i + 1] == (byte) 0xD8) {
                System.out.println("Found potential JPEG start at position " + i);

                byte[] jpegData = new byte[data.length - i];
                System.arraycopy(data, i, jpegData, 0, jpegData.length);

                try {
                    return readImageSafely(jpegData);
                } catch (Exception e) {
                    System.out.println("JPEG at position " + i + " failed: " + e.getMessage());
                }
            }
        }

        throw new IOException("No valid JPEG data found");
    }

    /**
     * Creates a resized image using safe bounds checking
     */
    private static BufferedImage createResizedImageSafely(BufferedImage originalImage, int targetSize) {
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();

        BufferedImage resizedImage = new BufferedImage(targetSize, targetSize, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resizedImage.createGraphics();

        try {
            g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_SPEED);

            g2d.setColor(Color.WHITE);
            g2d.fillRect(0, 0, targetSize, targetSize);

            double scaleX = (double) targetSize / originalWidth;
            double scaleY = (double) targetSize / originalHeight;
            double scale = Math.max(scaleX, scaleY);

            int scaledWidth = (int) Math.round(originalWidth * scale);
            int scaledHeight = (int) Math.round(originalHeight * scale);

            int x = (targetSize - scaledWidth) / 2;
            int y = (targetSize - scaledHeight) / 2;

            g2d.drawImage(originalImage, x, y, scaledWidth, scaledHeight, null);

        } finally {
            g2d.dispose();
        }

        return resizedImage;
    }

    /**
     * Attempts to fix common image data corruption issues
     */
    private static byte[] tryFixImageData(byte[] originalData) {
        if (originalData.length > 10) {
            for (int i = 0; i < Math.min(10, originalData.length - 2); i++) {
                if (originalData[i] == (byte) 0xFF && originalData[i + 1] == (byte) 0xD8) {
                    System.out.println("Found JPEG marker at position " + i + ", extracting...");
                    byte[] correctedData = new byte[originalData.length - i];
                    System.arraycopy(originalData, i, correctedData, 0, correctedData.length);
                    return correctedData;
                }
            }

            String dataAsString = new String(originalData, 0, Math.min(100, originalData.length),
                    java.nio.charset.StandardCharsets.ISO_8859_1);
            if (dataAsString.contains("JFIF") || dataAsString.contains("Exif")) {
                return attemptJpegHeaderReconstruction(originalData);
            }
        }

        return originalData;
    }

    /**
     * Attempts to reconstruct JPEG header
     */
    private static byte[] attemptJpegHeaderReconstruction(byte[] originalData) {
        for (int i = 0; i < Math.min(50, originalData.length - 2); i++) {
            if ((originalData[i] == (byte) 0xFF && originalData[i + 1] == (byte) 0xE0) ||
                    (originalData[i] == (byte) 0xFF && originalData[i + 1] == (byte) 0xE1)) {

                byte[] reconstructed = new byte[originalData.length - i + 2];
                reconstructed[0] = (byte) 0xFF;
                reconstructed[1] = (byte) 0xD8;

                System.arraycopy(originalData, i, reconstructed, 2, originalData.length - i);

                return reconstructed;
            }
        }

        System.out.println("Adding standard JPEG header as last resort...");
        byte[] withHeader = new byte[originalData.length + 2];
        withHeader[0] = (byte) 0xFF;
        withHeader[1] = (byte) 0xD8;
        System.arraycopy(originalData, 0, withHeader, 2, originalData.length);

        return withHeader;
    }

    /**
     * Checks if a string looks like base64 data
     */
    private static boolean isLikelyBase64(String data) {
        if (data.startsWith("data:image/")) {
            return true;
        }

        if (data.length() > 100 && data.matches("^[A-Za-z0-9+/]*={0,2}$")) {
            return true;
        }

        return false;
    }

    /**
     * Handles case where base64 string is stored as byte array
     */
    private static byte[] handleBase64StoredAsBytes(String base64Data, int size, float quality) throws IOException {
        try {
            String cleanBase64 = base64Data;
            if (base64Data.startsWith("data:image/")) {
                int commaIndex = base64Data.indexOf(',');
                if (commaIndex > 0) {
                    cleanBase64 = base64Data.substring(commaIndex + 1);
                }
            }

            byte[] actualImageBytes = ImageUtil.decodeFromBase64(cleanBase64);

            return resizeForAvatar(actualImageBytes, size, quality);

        } catch (Exception e) {
            throw new IOException("Failed to process base64 image data: " + e.getMessage(), e);
        }
    }

    /**
     * Resizes image maintaining aspect ratio and crops to square
     */
    private static BufferedImage resizeImageSquare(BufferedImage originalImage, int targetSize) {
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();

        System.out.println("Original image dimensions: " + originalWidth + "x" + originalHeight);

        if (originalWidth <= 0 || originalHeight <= 0) {
            throw new IllegalArgumentException("Invalid image dimensions: " + originalWidth + "x" + originalHeight);
        }

        int scaledSize = Math.max(originalWidth, originalHeight);
        double scale = (double) targetSize / scaledSize;

        int scaledWidth = Math.max(1, (int) (originalWidth * scale));
        int scaledHeight = Math.max(1, (int) (originalHeight * scale));

        System.out.println("Scaled dimensions: " + scaledWidth + "x" + scaledHeight);

        BufferedImage scaledImage = new BufferedImage(scaledWidth, scaledHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = scaledImage.createGraphics();

        try {
            g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR);
            g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_SPEED);
            g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_OFF);

            g2d.setColor(Color.WHITE);
            g2d.fillRect(0, 0, scaledWidth, scaledHeight);

            g2d.drawImage(originalImage, 0, 0, scaledWidth, scaledHeight, null);
        } finally {
            g2d.dispose();
        }

        if (scaledWidth != scaledHeight) {
            int cropSize = Math.min(scaledWidth, scaledHeight);
            cropSize = Math.min(cropSize, targetSize);

            int cropX = Math.max(0, (scaledWidth - cropSize) / 2);
            int cropY = Math.max(0, (scaledHeight - cropSize) / 2);

            if (cropX + cropSize > scaledWidth) {
                cropX = scaledWidth - cropSize;
            }
            if (cropY + cropSize > scaledHeight) {
                cropY = scaledHeight - cropSize;
            }

            System.out.println("Cropping from " + cropX + "," + cropY + " with size " + cropSize);

            try {
                return scaledImage.getSubimage(cropX, cropY, cropSize, cropSize);
            } catch (Exception e) {
                System.err.println("Crop failed, returning scaled image: " + e.getMessage());
                BufferedImage centeredImage = new BufferedImage(targetSize, targetSize, BufferedImage.TYPE_INT_RGB);
                Graphics2D g2dCentered = centeredImage.createGraphics();
                try {
                    g2dCentered.setColor(Color.WHITE);
                    g2dCentered.fillRect(0, 0, targetSize, targetSize);

                    int x = (targetSize - scaledWidth) / 2;
                    int y = (targetSize - scaledHeight) / 2;
                    g2dCentered.drawImage(scaledImage, x, y, null);
                    return centeredImage;
                } finally {
                    g2dCentered.dispose();
                }
            }
        }

        if (scaledWidth != targetSize || scaledHeight != targetSize) {
            BufferedImage finalImage = new BufferedImage(targetSize, targetSize, BufferedImage.TYPE_INT_RGB);
            Graphics2D g2dFinal = finalImage.createGraphics();
            try {
                g2dFinal.setColor(Color.WHITE);
                g2dFinal.fillRect(0, 0, targetSize, targetSize);
                g2dFinal.drawImage(scaledImage, 0, 0, targetSize, targetSize, null);
                return finalImage;
            } finally {
                g2dFinal.dispose();
            }
        }

        return scaledImage;
    }

    /**
     * Converts BufferedImage to byte array with quality control
     */
    private static byte[] imageToByteArray(BufferedImage image, String format, float quality) throws IOException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            if ("jpg".equalsIgnoreCase(format) || "jpeg".equalsIgnoreCase(format)) {
                javax.imageio.ImageWriter writer = ImageIO.getImageWritersByFormatName("jpeg").next();
                javax.imageio.ImageWriteParam param = writer.getDefaultWriteParam();
                param.setCompressionMode(javax.imageio.ImageWriteParam.MODE_EXPLICIT);
                param.setCompressionQuality(quality);

                try (javax.imageio.stream.ImageOutputStream ios = ImageIO.createImageOutputStream(outputStream)) {
                    writer.setOutput(ios);
                    writer.write(null, new javax.imageio.IIOImage(image, null, null), param);
                }
                writer.dispose();
            } else {
                if (!ImageIO.write(image, format, outputStream)) {
                    throw new IOException("Failed to write image in format: " + format);
                }
            }
            return outputStream.toByteArray();
        }
    }

    /**
     * Converts BufferedImage to byte array (backward compatibility)
     */
    private static byte[] imageToByteArray(BufferedImage image, String format) throws IOException {
        return imageToByteArray(image, format, JPEG_QUALITY);
    }

    /**
     * Combines Base64 decoding, resizing, and encoding in one method
     */
    public static String resizeBase64Avatar(String base64Image) throws IOException {
        if (base64Image == null || base64Image.isEmpty()) {
            throw new IllegalArgumentException("Base64 image string cannot be null or empty");
        }

        String base64Data = base64Image;
        if (base64Image.startsWith("data:image/")) {
            int commaIndex = base64Image.indexOf(',');
            if (commaIndex > 0) {
                base64Data = base64Image.substring(commaIndex + 1);
            }
        }

        byte[] imageData = ImageUtil.decodeFromBase64(base64Data);
        byte[] resizedData = resizeForAvatar(imageData);
        return ImageUtil.encodeToBase64(resizedData);
    }

    /**
     * Get file size reduction information
     */
    public static ImageSizeInfo getImageSizeInfo(byte[] originalData, byte[] resizedData) {
        long originalSize = originalData.length;
        long resizedSize = resizedData.length;
        double reductionPercentage = ((double) (originalSize - resizedSize) / originalSize) * 100;

        return new ImageSizeInfo(originalSize, resizedSize, reductionPercentage);
    }

    /**
     * Inner class to hold size information
     */
    public static class ImageSizeInfo {
        private final long originalSize;
        private final long resizedSize;
        private final double reductionPercentage;

        public ImageSizeInfo(long originalSize, long resizedSize, double reductionPercentage) {
            this.originalSize = originalSize;
            this.resizedSize = resizedSize;
            this.reductionPercentage = reductionPercentage;
        }

        public long getOriginalSize() { return originalSize; }
        public long getResizedSize() { return resizedSize; }
        public double getReductionPercentage() { return reductionPercentage; }

        @Override
        public String toString() {
            return String.format("Original: %d bytes, Resized: %d bytes, Reduction: %.1f%%",
                    originalSize, resizedSize, reductionPercentage);
        }
    }
}
