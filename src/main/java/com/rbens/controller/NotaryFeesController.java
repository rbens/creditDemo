package com.rbens.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class NotaryFeesController extends AbstractController{

    private final static String NOTARY_FREES_URL = "https://www.cafpi.fr/calculators/notary-fees-amount";

    private final static String REQUEST_BODY = "{\"cost\":\"%s\",\"property_type\":\"%s\",\"zip\":\"%s\"}";

    @RequestMapping(value = "/notary-frees", method = GET)
    public String notaryFrees(@RequestParam String cost, @RequestParam String propertyType, @RequestParam String zip) throws IOException {
        final URL url = new URL(NOTARY_FREES_URL);
        final String[] params = {cost, propertyType, zip};
        final HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setDoOutput(true);
        urlConnection.setRequestMethod("POST");
        urlConnection.setRequestProperty("Content-Type", "application/json");
        urlConnection.setRequestProperty("Origin", "https://www.cafpi.fr");
        urlConnection.setRequestProperty("Referer", "https://www.cafpi.fr/credit-immobilier/simulateur/calcul-frais-notaire");
        addParamsToRequestBody(urlConnection, REQUEST_BODY, params);
        urlConnection.connect();

        return getResponseAsString(urlConnection);
    }
}
