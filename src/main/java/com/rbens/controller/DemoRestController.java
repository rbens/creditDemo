package com.rbens.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rbens.entity.Mensualite;
import com.rbens.entity.Resultats;
import com.rbens.entity.Series;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class DemoRestController {


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String initIndex() {
        return "index";
    }

    @RequestMapping(value = "/amortissements", method = RequestMethod.POST)
    @ResponseBody
    public Mensualite getAmortissement(@RequestBody String mensualite) throws IOException {
        return new ObjectMapper().readValue(mensualite, Series.class);
    }

    @RequestMapping(value = "/series", method = RequestMethod.POST)
    @ResponseBody
    public Mensualite getSeries(@RequestBody String mensualite) throws IOException {
        return new ObjectMapper().readValue(mensualite, Series.class);
    }

}