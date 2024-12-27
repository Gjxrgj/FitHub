package mk.ukim.finki.venueservice.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/venue")
public class VenueApiController {
    @GetMapping("/test")
    public String test(){
        return "raboti";
    }
}
