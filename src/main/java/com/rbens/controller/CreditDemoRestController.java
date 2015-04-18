package com.rbens.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rbens.entity.Mensualite;
import com.rbens.entity.Resultats;
import com.rbens.entity.Series;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(value = "/")
public class CreditDemoRestController {


    @RequestMapping(value = "/amortissements", method = RequestMethod.POST)
    public Mensualite getAmortissement(@RequestBody String mensualite) throws IOException {
        return new ObjectMapper().readValue(mensualite, Resultats.class);
    }

    @RequestMapping(value = "/series", method = RequestMethod.POST)
    public Mensualite getSeries(@RequestBody String mensualite) throws IOException {
        return new ObjectMapper().readValue(mensualite, Series.class);
    }

}