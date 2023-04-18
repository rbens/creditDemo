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
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Arrays;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
final class CreditDemoRestController{


    private final static String RATES_URL = "https://www.guideducredit.com/HTMcorps/Fichiersmarche/tauxbanque.htm";
    private final static String DOM_SELECTOR = ".table-scroll .table-rate td";


    @RequestMapping(value = "/amortissements", method = POST)
    public MonthlyPayment amortissement(@RequestBody String mensualite) throws IOException {
        return new ObjectMapper().readValue(mensualite, Results.class);
    }

    @RequestMapping(value = "/rates", method = GET)
    public String[] getMarketRates() throws IOException {
        final Document document =  Jsoup.connect(RATES_URL).get();

        final Elements elements = document.select(DOM_SELECTOR);

        final String[] array = elements.stream()
                .filter(element -> element.hasText() && element.text().contains("%"))
                .map(Element::text)
                .toArray(String[]::new);
        return Arrays.copyOfRange(array, 5, 10) ;
    }

}
