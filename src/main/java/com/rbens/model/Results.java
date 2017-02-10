package com.rbens.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rbens.utils.NumberFormatter;

import static com.rbens.utils.ArrayNumber.reverseArray;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public final class Results extends MonthlyPayment {

    @JsonProperty
    double insuranceTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.insuranceAmount).sum();
    }

    @JsonProperty
    double interestTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.interestAmount).sum();
    }

    @JsonProperty
    double owingTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.monthlyAmount).sum();
    }

    @JsonProperty
    double creditTotalCost() { return interestTotalCost() + insuranceTotalCost(); }

    @JsonProperty(value = "interetSeries")
    double[] interetSeries() {
        final double[] interetSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.interestAmount);
            interetSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul);
        }

        return interetSeries;
    }

    @JsonProperty(value = "assuranceSeries")
    double[] assuranceSeries() {
        final double[] assuranceSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.insuranceAmount);
            assuranceSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul);
        }
        return assuranceSeries;
    }

    @JsonProperty(value = "creditSeries")
    double[] creditSeries() {
        final double[] creditSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.insuranceAmount + writeDown.interestAmount);
            creditSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul) ;
        }
        return creditSeries;
    }

    @JsonProperty(value = "capitalRestantSeries")
    double[] capitalRestantSeries() {
        final double[] capitalRestantSeries = new double[months];
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            capitalRestantSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(writeDown.owingAmount);
        }
        return capitalRestantSeries;
    }

    @JsonProperty(value = "totalRestantSeries")
    Double[] totalRestantSeries() {
        final Double[] totalRestantSeries = new Double[months];
        double cumul = 0;
        int  cpt = 0;


        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.monthlyAmount);
            totalRestantSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul);
        }

        return reverseArray(totalRestantSeries);
    }

}
