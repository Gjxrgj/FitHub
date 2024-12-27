package mk.ukim.finki.venueservice.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final RestTemplate restTemplate;
    private static final String userServiceUrl = "http://localhost:9091/api/users/validate";

    public JwtRequestFilter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwtToken = authorizationHeader.substring(7);

            // Create headers and set the JWT token
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + jwtToken);

            // Create the request entity
            HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);

            try {
                // Call UserService to validate the token
                ResponseEntity<Boolean> userServiceResponse = restTemplate.exchange(
                        userServiceUrl,
                        HttpMethod.GET,
                        requestEntity,
                        Boolean.class
                );

                Boolean isValid = userServiceResponse.getBody();
                if (isValid != null && isValid) {
                    // Token is valid, continue with the request
                    chain.doFilter(request, response);
                } else {
                    // Token is invalid
                    throw new RuntimeException();
                    //response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                }
            } catch (Exception e) {
                // Handle exceptions
                throw new RuntimeException();
                //response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }
    }
}
