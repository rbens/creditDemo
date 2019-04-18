package com.rbens.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class CitiesController extends AbstractController{

    private final static String CITIES_URL = "https://vicopo.selfbuild.fr/";

    @RequestMapping(value = "/cities", method = GET)
    public String cities(@RequestParam(required = false) String city, @RequestParam(required = false) String code) throws IOException {
        final String urlParam = (city != null ? "?city="+city : "") + (code != null ? "?code="+code : "");
        final URL url = new URL(CITIES_URL + urlParam);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");
        return getResponseAsString(urlConnection);
    }

}
