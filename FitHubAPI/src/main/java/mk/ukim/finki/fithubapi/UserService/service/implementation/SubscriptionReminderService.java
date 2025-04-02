package mk.ukim.finki.fithubapi.UserService.service.implementation;

import jakarta.mail.MessagingException;
import mk.ukim.finki.fithubapi.UserService.service.UserService;
import mk.ukim.finki.fithubapi.VenueService.model.Subscription;
import mk.ukim.finki.fithubapi.VenueService.model.Venue;
import mk.ukim.finki.fithubapi.VenueService.repository.SubscriptionRepository;
import mk.ukim.finki.fithubapi.VenueService.service.impl.EmailService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class SubscriptionReminderService {
    private final SubscriptionRepository subscriptionRepository;
    private final UserService userService;
    private final EmailService emailService;
    public SubscriptionReminderService(SubscriptionRepository subscriptionRepository, UserService userService, EmailService emailService) {
        this.subscriptionRepository = subscriptionRepository;
        this.userService = userService;
        this.emailService = emailService;
    }

    @Scheduled(cron = "0 0 12 * * ?") // Runs every day at 12:00 PM
    public void sendSubscriptionReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sevenDaysFromNow = LocalDateTime.now().plusDays(7);

        List<Subscription> expiringSubscriptionsIn7Days = subscriptionRepository
                .findByExpirationDateIgnoringTime(sevenDaysFromNow.getYear(), sevenDaysFromNow.getMonthValue(), sevenDaysFromNow.getDayOfMonth());

        for (Subscription subscription : expiringSubscriptionsIn7Days) {
            String userEmail = userService.findById(subscription.getVenue().getUserId()).getEmail();
            String subject = "FitHub Subscription Expiring Soon";
            String body = "<h3>Your subscription is expiring on " +
                    subscription.getExpirationDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")) +
                    ".</h3>" + "<p>Please renew your subscription to have your venue '" + subscription.getVenue().getName() + "' displayed to other users.</p>";
            try {
                emailService.sendEmail(userEmail, subject, body);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }

        List<Subscription> expiringSubscriptionsToday = subscriptionRepository
                .findByExpirationDateIgnoringTime(now.getYear(), now.getMonthValue(), now.getDayOfMonth());

        for (Subscription subscription : expiringSubscriptionsToday) {
            String userEmail = userService.findById(subscription.getVenue().getUserId()).getEmail();
            String subject = "FitHub Subscription Expiring Today";
            String body = "<h3>Your subscription is expiring on " +
                    subscription.getExpirationDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")) +
                    ".</h3>" + "<p>Please renew your subscription to have your venue '" + subscription.getVenue().getName() + "' displayed to other users.</p>";
            try {
                emailService.sendEmail(userEmail, subject, body);
                System.out.println("Reminder email sent to: " + userEmail);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }
}
