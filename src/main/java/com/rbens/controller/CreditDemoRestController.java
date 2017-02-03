package com.rbens.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rbens.model.MonthlyPayment;
import com.rbens.model.Results;
import com.rbens.model.Series;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/")
public class CreditDemoRestController {


    @RequestMapping(value = "/amortissements", method = POST)
    public MonthlyPayment getAmortissement(@RequestBody String mensualite) throws IOException {
        return new ObjectMapper().readValue(mensualite, Results.class);
    }

    @RequestMapping(value = "/series", method = POST)
    public MonthlyPayment getSeries(@RequestBody String mensualite) throws IOException {
        return new ObjectMapper().readValue(mensualite, Series.class);
    }

}