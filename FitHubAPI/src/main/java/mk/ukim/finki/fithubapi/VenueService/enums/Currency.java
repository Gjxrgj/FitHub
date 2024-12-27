package mk.ukim.finki.fithubapi.VenueService.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Currency {
    AED("AED"), // United Arab Emirates Dirham
    ARS("ARS"), // Argentine Peso
    AUD("AUD"), // Australian Dollar
    BRL("BRL"), // Brazilian Real
    CAD("CAD"), // Canadian Dollar
    CHF("CHF"), // Swiss Franc
    CLP("CLP"), // Chilean Peso
    CNY("CNY"), // Chinese Yuan
    COP("COP"), // Colombian Peso
    CZK("CZK"), // Czech Koruna
    DKK("DKK"), // Danish Krone
    EUR("EUR"), // Euro
    GBP("GBP"), // British Pound Sterling
    HKD("HKD"), // Hong Kong Dollar
    HUF("HUF"), // Hungarian Forint
    IDR("IDR"), // Indonesian Rupiah
    ILS("ILS"), // Israeli New Shekel
    INR("INR"), // Indian Rupee
    JPY("JPY"), // Japanese Yen
    KRW("KRW"), // South Korean Won
    MXN("MXN"), // Mexican Peso
    MKD("MKD"), // Macedonian Denar
    MYR("MYR"), // Malaysian Ringgit
    NOK("NOK"), // Norwegian Krone
    NZD("NZD"), // New Zealand Dollar
    PHP("PHP"), // Philippine Peso
    PLN("PLN"), // Polish Zloty
    RUB("RUB"), // Russian Ruble
    SEK("SEK"), // Swedish Krona
    SGD("SGD"), // Singapore Dollar
    THB("THB"), // Thai Baht
    TWD("TWD"), // New Taiwan Dollar
    TRY("TRY"), // Turkish Lira
    USD("USD"), // United States Dollar
    ZAR("ZAR"); // South African Rand

    private final String value;

    Currency(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
