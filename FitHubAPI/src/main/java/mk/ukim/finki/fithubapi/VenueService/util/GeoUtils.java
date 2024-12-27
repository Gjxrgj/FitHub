package mk.ukim.finki.fithubapi.VenueService.util;

import java.util.HashMap;
import java.util.Map;

public class GeoUtils {
    public static final double Radius = 5000.0;

    public static Map<String, Double> calculateBoundingBox(double latitude, double longitude, double radius) {
        double latOffset = radius / 111.0;
        double lonOffset = radius / (111.0 * Math.cos(Math.toRadians(latitude)));

        double minLatitude = latitude - latOffset;
        double maxLatitude = latitude + latOffset;
        double minLongitude = longitude - lonOffset;
        double maxLongitude = longitude + lonOffset;

        Map<String, Double> bounds = new HashMap<>();
        bounds.put("minLatitude", minLatitude);
        bounds.put("maxLatitude", maxLatitude);
        bounds.put("minLongitude", minLongitude);
        bounds.put("maxLongitude", maxLongitude);

        return bounds;
    }
}
