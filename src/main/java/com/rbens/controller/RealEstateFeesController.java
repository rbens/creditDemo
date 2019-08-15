package com.rbens.controller;

import com.rbens.model.RealEstatePurchaseFees;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static java.lang.Double.parseDouble;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class RealEstateFeesController extends AbstractController{

    @RequestMapping(value = "/real-estate-fees", method = GET)
    public RealEstatePurchaseFees.Details costDetails(@RequestParam String cost, @RequestParam String propertyType, @RequestParam String zip) {
        return RealEstatePurchaseFees.buildFrom(parseDouble(cost), zip).getDetails();
    }
}
