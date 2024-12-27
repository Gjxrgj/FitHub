package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;

@Data
public class ContactInformationDto {
    private String contactNumber;
    private String contactEmail;
    private String businessWebsite;

    public ContactInformationDto(String contactNumber, String contactEmail, String businessWebsite) {
        this.contactNumber = contactNumber;
        this.contactEmail = contactEmail;
        this.businessWebsite = businessWebsite;
    }
}
