package mk.ukim.finki.fithubapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FitHubAPIApplication {

    public static void main(String[] args) {
        SpringApplication.run(FitHubAPIApplication.class, args);
    }

}
