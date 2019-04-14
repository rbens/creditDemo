package com.rbens.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rbens.model.MonthlyPayment;
import com.rbens.model.Results;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/")
final class CreditDemoRestController {


    private final static String RATES_URL = "https://www.guideducredit.com/HTMcorps/Fichiersmarche/tauxbanque.htm";
    private final static String DOM_SELECTOR = ".tab_taux_l .tab_clair td";
    private final static String NOTARY_FREES_URL = "https://www.cafpi.fr/calculators/notary-fees-amount";
    private final static String CITIES_URL = "https://vicopo.selfbuild.fr/";
    private final static String REQUEST_BODY = "{\"cost\":\"%s\",\"property_type\":\"%s\",\"zip\":\"%s\"}";

    @RequestMapping(value = "/amortissements", method = POST)
    public MonthlyPayment amortissement(@RequestBody String mensualite) throws IOException {
        return new ObjectMapper().readValue(mensualite, Results.class);
    }

    @RequestMapping(value = "/cities", method = GET)
    public String cities(@RequestParam(required = false) String city, @RequestParam(required = false) String code) throws IOException {
        final String urlParam = (city != null ? "?city="+city : "") + (code != null ? "?code="+code : "");
        final URL url = new URL(CITIES_URL + urlParam);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");
        return getResponseAsString(urlConnection);
    }

    @RequestMapping(value = "/notary-frees", method = GET)
    public String notaryFrees(@RequestParam String cost, @RequestParam String propertyType, @RequestParam String zip) throws IOException {
        URL url = new URL(NOTARY_FREES_URL);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setDoOutput(true);
        urlConnection.setRequestMethod("POST");
        urlConnection.setRequestProperty("Content-Type", "application/json");
        urlConnection.setRequestProperty("Origin", "https://www.cafpi.fr");
        urlConnection.setRequestProperty("Referer", "https://www.cafpi.fr/credit-immobilier/simulateur/calcul-frais-notaire");
        addParamsToRequestBody(cost, propertyType, zip, urlConnection);
        urlConnection.connect();

        return getResponseAsString(urlConnection);
    }

    @RequestMapping(value = "/rates", method = GET)
    public String[] getMarketRates() throws IOException {
        final Document document =  Jsoup.connect(RATES_URL).get();

        final Elements elements = document.select(DOM_SELECTOR);

        return  elements.stream()
                .filter(element -> element.hasText() && element.text().contains("%"))
                .map(Element::text)
                .toArray(String[]::new);
    }

    private String getResponseAsString(HttpURLConnection con) throws IOException {
        final BufferedInputStream bis = new BufferedInputStream(con.getInputStream());
        final ByteArrayOutputStream buf = new ByteArrayOutputStream();
        int result2 = bis.read();
        while(result2 != -1) {
            buf.write((byte) result2);
            result2 = bis.read();
        }
        return buf.toString();
    }

    private void addParamsToRequestBody(String cost, String propertyType, String zip, HttpURLConnection con) throws IOException {
        final OutputStream os = con.getOutputStream();
        final OutputStreamWriter osw = new OutputStreamWriter(os, UTF_8);
        osw.write(String.format(REQUEST_BODY, cost, propertyType, zip));
        osw.flush();
        osw.close();
        os.close();
    }

}
