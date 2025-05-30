package com.rbens.model;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Created by rabah on 15/10/17.
 */
public class ResultsTest {

    private Results results;

    @Test
    public void insuranceTotalCost() {

    }

    @Test
    public void interestTotalCost() {

    }

    @Test
    public void owingTotalCost() {

    }

    @Test
    public void creditTotalCost() {

    }

    @Test
    public void interetSeries() {

    }

    @Test
    public void assuranceSeries() {

    }

    @Test
    public void creditSeries() {

    }

    @Test
    public void capitalRestantSeries() {

    }

    @Test
    public void totalRestantSeries() {

    }

    private int months;

    private double capital;

    private float interestRate;

    private float insuranceRate;

    //TODO : test must be finished
    @BeforeEach
    public void setUp(){
        results = new Results();
        results.months = 12;
        results.capital = 15000;
        results.interestRate = 1.0f;
    }

    @Test
    public void testInterestSeries(){

    }




}
